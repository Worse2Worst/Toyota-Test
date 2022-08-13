from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/toyota_test_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(254))

    def __init__(self, name, email) -> None:
        super().__init__()
        self.name= name
        self.email = email


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/users', methods = ['GET'])
def get_users():
    requested_id = request.args.get('id', None)
    if not requested_id or requested_id == 'all':
        all_users = Users.query.all()
        results = users_schema.dump(all_users)
        return jsonify(results)
    else:
        user = Users.query.get(requested_id)
        return user_schema.jsonify(user)


@app.route('/users', methods = ['POST'])
def add_user():
    name = request.json['name']
    email = request.json['email']
    users = Users(name, email)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)
    

if __name__ == '__main__':
    # TODO 
    app.run(debug=True)
