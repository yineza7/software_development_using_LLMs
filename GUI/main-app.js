document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('grocery-form');
    const expensesList = document.getElementById('expenses');
    const totalExpense = document.getElementById('total-expense');
    let monthlyExpense = 0;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const item = document.getElementById('item').value;
        const price = parseFloat(document.getElementById('price').value);

        if (item && !isNaN(price) && price > 0) {
            // Add expense to the list
            const expenseItem = document.createElement('li');
            expenseItem.textContent = `${item}: $${price.toFixed(2)}`;
            expensesList.appendChild(expenseItem);

            // Update total expense
            monthlyExpense += price;
            totalExpense.textContent = `Total Monthly Expense: $${monthlyExpense.toFixed(2)}`;

            // Clear form fields
            document.getElementById('item').value = '';
            document.getElementById('price').value = '';
        } else {
            alert('Please enter valid item and price.');
        }
    });
});