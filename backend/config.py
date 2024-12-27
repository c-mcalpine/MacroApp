import os

class Config:
    # convert to postgresql
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
    # accounts.db, transactions.db, nutrition.db, restaurants.db, yelp.db
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# add all config variables
