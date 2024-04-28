from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS if needed

app = Flask(__name__)
CORS(app)  # Enable CORS if frontend is served from a different origin

# Store expenses in a nested structure under each name
expenses = {}

@app.route('/add_expenses', methods=['POST'])
def add_expenses():
    data = request.json
    name = data.get('name')
    item = data.get('item')
    price = data.get('expense')

    if not all([name, item, price is not None]):  # Check all fields are provided
        return jsonify({"error": "All fields (name, item, expense) are required"}), 400

    if name not in expenses:
        expenses[name] = []

    # Append the new expense to the person's list
    expenses[name].append({"item": item, "price": price})
    
    return jsonify({"message": "Expense added successfully!"}), 200

@app.route('/total_expenses/<name>', methods=['GET'])
def total_expenses(name):
    if name in expenses:
        total = sum(expense['price'] for expense in expenses[name])
        return jsonify({"name": name, "total_expenses": total}), 200
    else:
        return jsonify({"error": "No expenses found for this name!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
