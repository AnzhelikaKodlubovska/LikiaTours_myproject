from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.models import db, ContactQuestion  # Додали нову модель сюди
from routes.auth import auth_bp
from routes.bookings import bookings_bp
from routes.reviews import reviews_bp
from routes.admin import admin_bp
from flask_mail import Mail

app = Flask(__name__)

# --- Конфігурація бази даних ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///likiatours.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

# --- Налаштування пошти ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'kodanzelika@gmail.com'
app.config['MAIL_PASSWORD'] = 'onza zlkd jfqn kolm' 
app.config['MAIL_DEFAULT_SENDER'] = 'kodanzelika@gmail.com'
app.config['MAIL_ASCII'] = False

# --- Ініціалізація розширень ---
mail = Mail(app)
db.init_app(app)
jwt = JWTManager(app)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# --- Обробка помилок JWT (для логів) ---
@jwt.invalid_token_loader
def invalid_token_callback(reason):
    print(f"❌ INVALID TOKEN: {reason}")
    return jsonify(error=reason), 422

@jwt.unauthorized_loader
def missing_token_callback(reason):
    return jsonify(error="Missing token"), 401

# --- Реєстрація Blueprint ---
app.register_blueprint(auth_bp)
app.register_blueprint(reviews_bp)
app.register_blueprint(bookings_bp)
app.register_blueprint(admin_bp)

# --- Основні маршрути ---

@app.route('/')
def home():
    return render_template('index.html')

# Маршрут для контактної форми (доступний всім без логіну)
@app.route('/api/contact', methods=['POST'])
def post_question():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        new_q = ContactQuestion(
            name=data.get('name'), 
            email=data.get('email'), 
            message=data.get('message')
        )
        db.session.add(new_q)
        db.session.commit()
        return jsonify({"message": "Дякуємо! Питання надіслано."}), 201
    except Exception as e:
        print(f"🔥 Помилка при збереженні питання: {e}")
        return jsonify({"error": "Серверна помилка"}), 500

# --- Запуск додатка ---
if __name__ == '__main__':
    with app.app_context():
        # Це створить нову базу likiatours.db з усіма таблицями
        db.create_all() 
    app.run(debug=True)