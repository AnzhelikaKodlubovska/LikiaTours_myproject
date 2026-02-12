from flask import Blueprint, request, jsonify
from models.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity 
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

# ---------- РЕЄСТРАЦІЯ (Без змін) ----------
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Невірний JSON'}), 400

    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({'error': 'Усі поля обов’язкові'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Користувач вже існує'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        username=username,
        password=hashed_password,
        email=email,
        is_admin=False # За замовчуванням звичайний юзер
    )

    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=str(new_user.id))

    return jsonify({
        'message': 'Реєстрація успішна',
        'token': token,
        'user': {
            'id': new_user.id,
            'name': new_user.username,
            'email': new_user.email
        }
    }), 201


# ---------- ЛОГІН (Додано поле is_admin у відповідь) ----------
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Невірний JSON'}), 400

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Невірні дані'}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        'message': 'Вхід успішний',
        'token': token,
        'user': {
            'id': user.id,
            'name': user.username,
            'email': user.email,
            'is_admin': user.is_admin # Важливо для React, щоб знати, чи показувати кнопку адмінки
        }
    }), 200

# ---------- ВИДАЛЕННЯ КОРИСТУВАЧА (Адмін-дія) ----------
@auth_bp.route('/admin/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    # 1. Перевірка, чи є поточний користувач (з токена) адміністратором
    current_user_id = get_jwt_identity()
    admin = User.query.get(current_user_id)
    
    if not admin or not admin.is_admin:
        return jsonify({"error": "Доступ заборонено. Ви не адміністратор"}), 403

    # 2. Пошук користувача для видалення
    user_to_delete = User.query.get_or_404(id)
    
    if user_to_delete.is_admin:
        return jsonify({"error": "Не можна видалити адміністратора"}), 400
        
    db.session.delete(user_to_delete)
    db.session.commit()
    
    return jsonify({"message": "Користувача видалено успішно"}), 200