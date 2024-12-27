import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify, Flask
from flask_cors import cross_origin
from google.oauth2 import id_token
from google.auth.transport import requests
from twilio.rest import Client
import random
from .models import Account, Transaction, NutritionInfo, Restaurant, Recommendation
from .schemas import AccountSchema, TransactionSchema, NutritionInfoSchema, RestaurantSchema, RecommendationSchema
from . import db
from .yelp_client import get_yelp_reviews

api_blueprint = Blueprint('api', __name__)
load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

otp_storage = {}

# Accounts
@api_blueprint.route('/accounts', methods=['POST'])
def create_account():
    data = request.json
    schema = AccountSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400
    new_account = Account(**data)
    db.session.add(new_account)
    db.session.commit()
    return schema.jsonify(new_account), 201

# Transactions
@api_blueprint.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    schema = TransactionSchema(many=True)
    return jsonify(schema.dump(transactions))

# Nutrition Info
@api_blueprint.route('/nutrition', methods=['GET'])
def get_nutrition():
    nutrition = NutritionInfo.query.all()
    schema = NutritionInfoSchema(many=True)
    return jsonify(schema.dump(nutrition))

# Restaurants
@api_blueprint.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    schema = RestaurantSchema(many=True)
    return jsonify(schema.dump(restaurants))

# Yelp from Copilot
@api_blueprint.route('/api/yelp_reviews', methods=['GET'])
def yelp_reviews():
    """
    Fetch Yelp reviews for a given term and location.

    Query Parameters:
        term (str): Search term (e.g., 'pizza', 'sushi').
        location (str): Search location (e.g., 'New York').

    Returns:
        JSON response with Yelp reviews or an error message.
    """
    term = request.args.get('term')
    location = request.args.get('location')
    limit = request.args.get('limit', 5, type=int)

    if not term or not location:
        return jsonify({'error': "Both 'term' and 'location' query parameters are required"}), 400

    results = get_yelp_reviews(term, location, limit)

    # If an error occurred in the Yelp client
    if isinstance(results, dict) and 'error' in results:
        return jsonify(results), 500

    return jsonify(results), 200

# add api for recommendations
# id, name, description, imageURL
@api_blueprint.route('/recommendations', methods=['GET'])
def get_recommendations():
    recommendations = Recommendation.query.all()
    schema = RecommendationSchema(many=True)
    return jsonify(schema.dump(recommendations))

# Google Sign-In Endpoint
@api_blueprint.route('/auth/google', methods=['POST'])
def google_sign_in():
    data = request.json
    token = data.get('token')
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "YOUR_GOOGLE_CLIENT_ID")
        if idinfo['aud'] != "YOUR_GOOGLE_CLIENT_ID": ## ADD CLIENT ID
            return jsonify({'error': 'Token is not valid for this app'}), 403

        user_email = idinfo['email']
        # Example: Fetch or create a user
        # user = get_or_create_user(email=user_email)

        return jsonify({'token': 'your-jwt-token'}), 200
    except ValueError:
        return jsonify({'error': 'Invalid Google token'}), 400

@api_blueprint.route('/auth/send-otp', methods=['POST'])
@cross_origin()
def send_otp():
    data = request.json
    phone_number = data.get('phoneNumber')

    if not phone_number:
        return jsonify({'error': 'Phone number is required'}), 400

    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)
    otp_storage[phone_number] = otp  # Store OTP temporarily

    try:
        # Send OTP via Twilio
        client.messages.create(
            body=f"Your verification code is {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return jsonify({'message': 'OTP sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to send OTP', 'details': str(e)}), 500
    
@api_blueprint.route('/auth/verify-otp', methods=['POST'])
@cross_origin()
def verify_otp():
    data = request.json
    phone_number = data.get('phoneNumber')
    otp = data.get('otp')

    if not phone_number or not otp:
        return jsonify({'error': 'Phone number and OTP are required'}), 400

    # Check OTP
    if otp_storage.get(phone_number) == int(otp):
        del otp_storage[phone_number]  # Clear OTP after verification
        # Generate a token (replace with JWT or session handling in production)
        return jsonify({'token': 'your-jwt-token'}), 200
    else:
        return jsonify({'error': 'Invalid OTP'}), 401
