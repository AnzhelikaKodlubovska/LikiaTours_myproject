from flask import Blueprint, request, jsonify, redirect, url_for, flash
from models.models import db, Review, User
# Імпортуємо тільки те, що дійсно існує в новій бібліотеці
from flask_jwt_extended import jwt_required, get_jwt_identity

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/review', methods=['POST'])
@jwt_required()
def add_review():
    data = request.get_json()
    try:
        user_id = int(get_jwt_identity())
        new_review = Review(
            user_id=user_id,
            content=data.get('content'),
            city=data.get('city')
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({'message': 'OK'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/reviews', methods=['GET'])
# ВИПРАВЛЕНО: Замість jwt_optional використовуємо optional=True
@jwt_required(optional=True)  
def get_reviews():
    current_user_id = get_jwt_identity()
    reviews = db.session.query(Review, User).join(User, Review.user_id == User.id).all()
    
    return jsonify([{
        'id': r.id,
        'name': u.username,
        'content': r.content,
        'city': r.city,
        'date': r.created_at.strftime('%d.%m.%Y'),
        'can_edit': str(r.user_id) == str(current_user_id) if current_user_id else False
    } for r, u in reviews])

@reviews_bp.route('/review/<int:review_id>', methods=['PUT'])
@jwt_required()
def edit_review(review_id):
    data = request.get_json()
    user_id = int(get_jwt_identity())
    review = Review.query.get_or_404(review_id)
    
    if review.user_id != user_id:
        return jsonify({'error': 'Доступ заборонено'}), 403
        
    review.content = data.get('content', review.content)
    review.city = data.get('city', review.city)
    db.session.commit()
    return jsonify({'message': 'Оновлено'})

# Ця функція видаляє ВЛАСНИЙ відгук користувача
@reviews_bp.route('/review/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id): # Це ім'я залишаємо
    user_id = int(get_jwt_identity())
    review = Review.query.get_or_404(review_id)
    
    if review.user_id != user_id:
        return jsonify({'error': 'Доступ заборонено'}), 403
        
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Видалено'})

# Ця функція видаляє БУДЬ-ЯКИЙ відгук (тільки для адміна)
@reviews_bp.route('/admin/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def admin_delete_review(id): # ЗМІНЕНО НА admin_delete_review
    # Бажано додати перевірку на адміна
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not user.is_admin:
        return jsonify({"error": "Тільки для адміністраторів"}), 403

    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Відгук видалено адміном"}), 200