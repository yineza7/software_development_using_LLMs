document.getElementById('grocery-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    const name = document.getElementById('name').value.trim();
    const item = document.getElementById('item').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    if (!name || !item || isNaN(price)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Add item to the list in the UI
    const expensesList = document.getElementById('expenses');
    const newItem = document.createElement('li');
    newItem.textContent = `${item}: $${price.toFixed(2)}`;
    expensesList.appendChild(newItem);

    // Update the total displayed
    updateTotal(price);

    // Prepare data to send to the server
    const data = { name, expense: price };

    // POST request to add expenses
    fetch('/add_expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Clear the item and price inputs after adding
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
});

function updateTotal(amount) {
    const totalExpenseText = document.getElementById('total-expense');
    let currentTotal = parseFloat(totalExpenseText.textContent.replace(/[^0-9.-]+/g, ""));
    currentTotal += amount;
    totalExpenseText.textContent = `Total Monthly Expense: $${currentTotal.toFixed(2)}`;
}

        // Update total expense display
        document.getElementById('total-expense').textContent = `Total Monthly Expense: $${totalExpense.toFixed(2)}`;
    }
});
