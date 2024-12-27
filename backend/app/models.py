from datetime import datetime
from sqlalchemy import Index
from . import db

# Account Model
class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True, index=True)
    email = db.Column(db.String(100), nullable=False, unique=True, index=True)
    password = db.Column(db.String(255), nullable=False)  # Store hashed passwords
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    transactions = db.relationship('Transaction', back_populates='account', lazy='dynamic')

# Transaction Model
class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    account = db.relationship('Account', back_populates='transactions')

    ## unique id for unregistered users
    ## if no `id` in Account, then use `account_id` in Transaction

# Nutrition Info Model
class NutritionInfo(db.Model):
    __tablename__ = 'nutrition_info'
    id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String(100), nullable=False, unique=True, index=True)
    calories = db.Column(db.Float, nullable=False)
    fat = db.Column(db.Float, nullable=False)
    carbs = db.Column(db.Float, nullable=False)
    protein = db.Column(db.Float, nullable=False)

    ## menu_section, menu_item, ingredient_category

# Restaurant Model
class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    __table_args__ = (Index('ix_restaurants_email', 'email'),)  # Index for email

class Recommendation(db.Model):
    __tablename__ = 'recommendations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    imageURL = db.Column(db.String(255), nullable=False)
