from flask import Flask, request, jsonify

app = Flask(__name__)

# Placeholder user data for demonstration purposes
users = {
    'john_doe': {'password': 'secret123'},
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    user = users.get(username)

    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'message': 'Login successful'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    ntid = data.get('ntid')

    if not ntid:
        return jsonify({'error': 'Missing NTID'}), 400

    # Check if the NTID is already taken (in a real application, you'd use a database)
    if ntid in users:
        return jsonify({'error': 'NTID already exists'}), 409

    # Create a new user (in a real application, you'd hash the password and store it securely)
    users[ntid] = {'password': data.get('password')}

    return jsonify({'message': 'Signup successful'}), 201

if __name__ == '__main__':
    app.run(debug=True)
