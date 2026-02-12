from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, User, Review, Booking, ContactQuestion
from flask_mail import Message

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/dashboard-data', methods=['GET'])
@jwt_required()
def get_dashboard_data():
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Доступ заборонено"}), 403

    users = User.query.all()
    reviews = Review.query.all()
    bookings = Booking.query.all()

    return jsonify({
        "users": [
            {"id": u.id, "username": u.username, "email": u.email, "is_admin": u.is_admin} 
            for u in users
        ],
        "reviews": [
            {
                "id": r.id, 
                "text": r.content, 
                "username": r.user.username  # Додаємо ім'я автора відгуку
            } for r in reviews
        ],
        "bookings": [
            {
                "id": b.id, 
                "tour_name": b.tour_name, 
                "guest_email": b.guest_email, 
                "username": b.user.username,  # Додаємо ім'я власника акаунта
                "status": b.status, 
                "price": b.price,
                "check_in": b.check_in,
                "check_out": b.check_out,
                "booking_date": b.booking_date.isoformat() if b.booking_date else None,
                "persons": b.persons
            } for b in bookings
        ]
    }), 200
    
@admin_bp.route('/confirm/<int:id>', methods=['POST'])
@jwt_required()
def confirm_booking(id):
    from app import mail
    data = request.get_json()
    manager_price = data.get('price')
    
    # 1. Знаходимо дані
    booking = Booking.query.get_or_404(id)
    user = User.query.get(booking.user_id)
    
    # 2. Оновлюємо базу даних (Ціна і Статус)
    booking.price = manager_price
    booking.status = "Confirmed"
    
    try:
        db.session.commit()
        
        # 3. Спроба відправити лист (обернута в захисний блок)
        try:
            msg = Message(
                "Likiatours: Підтвердження бронювання", 
                recipients=[user.email]
            )
            msg.body = f"Вітаємо! Ваш тур '{booking.tour_name}' підтверджено.\nСума до сплати: {manager_price} грн."
            mail.send(msg)
            return jsonify({"message": "OK"}), 200
            
        except Exception as e:
            # Якщо пошта не надіслалася (наприклад, через gmeil), ми все одно кажемо React, що все ок
            print(f"⚠️ Лист не надіслано: {e}")
            return jsonify({
                "message": "OK", 
                "warning": "Ціна збережена, але лист не доставлено"
            }), 200

    except Exception as db_error:
        db.session.rollback()
        return jsonify({"error": "Помилка бази даних"}), 500

@admin_bp.route('/delete_review/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

# Видалення бронювання
@admin_bp.route('/delete_booking/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_booking(id):
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    
    # Перевірка на адміна
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Доступ заборонено"}), 403

    booking = Booking.query.get_or_404(id)
    try:
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"message": "Booking deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Видалення користувача
@admin_bp.route('/delete_user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    
    if not current_user or not current_user.is_admin:
        return jsonify({"error": "Доступ заборонено"}), 403

    user_to_delete = User.query.get_or_404(id)
    
    # Захист: не дозволяємо видалити самого себе (поточного адміна)
    if user_to_delete.id == current_user.id:
        return jsonify({"error": "Ви не можете видалити власний акаунт"}), 400

    try:
        # Увага: якщо у користувача є відгуки або бронювання, 
        # вони також мають бути видалені або прив'язані до іншого об'єкта
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Неможливо видалити користувача (можливо, у нього є активні бронювання)"}), 500
    
# admin_bp.py або файл, де налаштований Blueprint('admin', ...)

# Отримання списку всіх питань для адмін-панелі
@admin_bp.route('/questions', methods=['GET'])
@jwt_required()
def get_questions():
    # Отримуємо всі питання, найновіші будуть зверху
    questions = ContactQuestion.query.order_by(ContactQuestion.created_at.desc()).all()
    
    # Якщо ви вирішили НЕ використовувати to_dict(), перетворюємо вручну:
    return jsonify([{
        "id": q.id,
        "name": q.name,
        "email": q.email,
        "message": q.message,
        "is_answered": q.is_answered,
        "date": q.created_at.strftime("%d.%m.%Y %H:%M")
    } for q in questions]), 200

# Відповідь на конкретне питання через email
@admin_bp.route('/answer-question/<int:id>', methods=['POST'])
@jwt_required()
def answer_question(id):
    from app import mail # Імпортуємо mail всередині, щоб не було помилки "circular import"
    data = request.json
    q = ContactQuestion.query.get_or_404(id)
    
    msg = Message("Відповідь від Likiatours", recipients=[q.email])
    msg.body = f"Вітаємо, {q.name}!\n\nВаше питання: {q.message}\n\nВідповідь: {data['answer']}"
    
    try:
        mail.send(msg)
        q.is_answered = True # Позначаємо в базі, що відповідь надана
        db.session.commit()
        return jsonify({"message": "Відповідь надіслана"}), 200
    except Exception as e:
        print(f"Помилка відправки листа: {e}")
        return jsonify({"error": "Помилка пошти"}), 500