from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import IntegrityError
import re
import os

app = Flask(__name__, static_folder='../build', static_url_path='')
CORS(app)

db_user = 'postgres'
db_password = 'password'
db_host = 'localhost'
local_db = 'toyota_test_db'
local_db_url = f'postgresql://{db_user}:{db_password}@{db_host }/{local_db}'

database_url = os.environ.get('DATABASE_URL', local_db_url)
if 'postgres://' in database_url:
    database_url = database_url.replace('postgres://', 'postgresql://')

app.config['SQLALCHEMY_DATABASE_URI'] = database_url 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(254))

    def __init__(self, name, email) -> None:
        super().__init__()
        self.name = name
        self.email = email


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/v1/users', methods=['GET'])
@cross_origin()
def get_users():
    requested_id = request.args.get('id', None)
    if not requested_id or requested_id == 'all':
        all_users = Users.query.all()
        results = users_schema.dump(all_users)
        return jsonify(results)
    else:
        user = Users.query.get(requested_id)
        return user_schema.jsonify(user)


@app.route('/v1/users', methods=['POST'])
@cross_origin()
def update_user():
    operation = request.args.get('type', None)
    if not operation or operation not in {'add', 'mod', 'del'}:
        return {
            "error": "Operation not recognized. Please select from [add, mod, del]"
        }
    
    if operation == 'add':
        name = request.json.get('name')
        email = request.json.get('email')
        if not name or not email:
            error_message = 'Please specify "name" and "email" fields.'
            return {"error": error_message}
        email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not (re.fullmatch(email_regex, email)):
            error_message = 'Email format is invalid'
            return {"error": error_message}
        return add_user(name, email)

    if operation == 'mod':
        new_name = request.json.get('name')
        requested_id = request.json.get('id')
        if not new_name or not requested_id:
            error_message = 'Please specify "name" and "id" fields.'
            return {"error": error_message}
        return modify_user(requested_id, new_name)

    if operation == 'del':
        requested_id = request.json.get('id')
        if not requested_id:
            error_message = 'Please specify "id" field.'
            return {"error": error_message}
        return delete_user(requested_id)
    

def add_user(name, email):
    users = Users(name, email)
    try:
        db.session.add(users)
        db.session.commit()
    except IntegrityError:
        return {
            "error": "The email is already existed."
        }
    return user_schema.jsonify(users)


def modify_user(requested_id, new_name):
    user = Users.query.get(requested_id)
    if not user:
        return {
            "error": "User not found. Please make sure the ID exists."
        }
    user.name = new_name
    db.session.commit()
    return user_schema.jsonify(user)


def delete_user(requested_id):
    user = Users.query.get(requested_id)
    if not user:
        return {
            "error": "User not found. Please make sure the ID exists."
        }
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory()
    
    
if __name__ == '__main__':
    debug = (os.environ.get('ENVIRONMENT') != 'production')
    app.run(debug=debug)

