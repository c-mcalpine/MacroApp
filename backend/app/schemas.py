from marshmallow import Schema, fields

class AccountSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    created_at = fields.DateTime(dump_only=True)

class TransactionSchema(Schema):
    id = fields.Int(dump_only=True)
    account_id = fields.Int(required=True)
    total = fields.Float(required=True)
    date = fields.DateTime(dump_only=True)

class NutritionInfoSchema(Schema):
    id = fields.Int(dump_only=True)
    ingredient_name = fields.Str(required=True)
    calories = fields.Float(required=True)
    fat = fields.Float(required=True)
    carbs = fields.Float(required=True)
    protein = fields.Float(required=True)

class RestaurantSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    address = fields.Str(required=True)
    phone = fields.Str(required=True)
    email = fields.Email(required=True)

# add api for recommendations
# id, name, description, imageURL
class RecommendationSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    imageURL = fields.URL(required=True)
