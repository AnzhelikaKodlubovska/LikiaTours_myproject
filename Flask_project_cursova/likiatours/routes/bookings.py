from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, Booking, User
from datetime import datetime
from flask_mail import Message

bookings_bp = Blueprint('bookings', __name__)

# ---------- КЛІЄНТСЬКА ЧАСТИНА (API) ----------

@bookings_bp.route('/book', methods=['POST'])
@jwt_required()
def book():
    data = request.get_json()
    try:
        user_id = int(get_jwt_identity())
        
        tour_name_val = data.get('tour_name') or 'Назва не вказана'

        new_booking = Booking(
            user_id=user_id,
            tour_name=tour_name_val,
            guest_name=data.get('guest_name'),
            guest_email=data.get('guest_email'),
            persons=data.get('persons'),
            check_in=data.get('check_in'),
            check_out=data.get('check_out'),
            booking_date=datetime.utcnow(),
            status="Pending" # Початковий статус
        )

        db.session.add(new_booking)
        db.session.commit()
        return jsonify({"message": "Бронювання успішне"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    try:
        user_id = int(get_jwt_identity())
        bookings = Booking.query.filter_by(user_id=user_id).all()
        result = [{
            'id': b.id,
            'tour_name': b.tour_name,
            'guest_name': b.guest_name,
            'guest_email': b.guest_email,
            'persons': b.persons,
            'check_in': b.check_in,
            'check_out': b.check_out,
            'status': getattr(b, 'status', 'Pending'), # Додаємо статус
            'price': getattr(b, 'price', '-'),         # Додаємо ціну
            'booking_date': b.booking_date.strftime('%Y-%m-%d %H:%M')
        } for b in bookings]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/booking/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def delete_booking(booking_id):
    try:
        user_id = int(get_jwt_identity())
        booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()

        if not booking:
            return jsonify({'error': 'Бронювання не знайдено'}), 404

        db.session.delete(booking)
        db.session.commit()
        return jsonify({'message': 'Бронювання видалено'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ---------- АДМІНІСТРАТИВНА ЧАСТИНА (HTML) ----------

@bookings_bp.route('/admin/confirm/<int:id>', methods=['POST'])
@jwt_required()  # Додаємо захист, щоб тільки авторизовані адміни могли це робити
def confirm_booking(id):
    # Імпортуємо mail тут, щоб уникнути циклічного імпорту
    from app import mail
    
    # 1. Отримуємо дані з JSON-запиту (React шле саме JSON)
    data = request.get_json()
    if not data:
        return jsonify({"error": "Невірний формат даних"}), 400
        
    manager_price = data.get('price')
    
    if not manager_price:
        return jsonify({"error": "Ціна обов'язкова"}), 400

    try:
        # 2. Знаходимо бронювання
        booking = Booking.query.get_or_404(id)
        user = User.query.get(booking.user_id)
        
        if not user or not user.email:
            return jsonify({"error": "Користувача або його email не знайдено"}), 404

        # 3. Оновлюємо базу даних
        booking.price = manager_price
        booking.status = "Confirmed"
        db.session.commit()

        # 4. Формуємо та відправляємо листа
        msg = Message(
            "Підтвердження бронювання - Likiatours",
            recipients=[user.email]
        )
        msg.body = (f"Вітаю, {user.username}!\n\n"
                    f"Ви забронювали тур: {booking.tour_name}.\n"
                    f"Менеджер перевірив деталі. Вартість становить: {manager_price} грн.\n"
                    f"Чи підтверджуєте Ви замовлення?\n\n"
                    f"З повагою, команда Likiatours.")
        
        mail.send(msg)
        
        # 5. Повертаємо JSON відповідь для React
        return jsonify({
            "message": f"Лист для {user.email} надіслано успішно!",
            "booking_id": id,
            "status": "Confirmed"
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Помилка на сервері: {str(e)}"}), 500