from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate  # Add Flask-Migrate
from dotenv import load_dotenv
import os

load_dotenv()

TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

db = SQLAlchemy()
migrate = Migrate()  # Initialize Flask-Migrate object

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)  # Initialize Flask-Migrate with the app and db
    CORS(app)

    # Register blueprints
    from .routes import api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app
