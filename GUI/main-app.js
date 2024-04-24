document.addEventListener('DOMContentLoaded', function () {
    // Expense info form
    const expenseInfoForm = document.getElementById('expense-info-form');
    expenseInfoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get values from the form
        const name = document.getElementById('name').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        // You can do something with these values, like storing them in variables or sending them to a server
        console.log(`Name: ${name}, Month: ${month}, Year: ${year}`);

        // Clear the form fields after submission
        expenseInfoForm.reset();
    });

    // Grocery expense form
    const groceryForm = document.getElementById('grocery-form');
    groceryForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get values from the form
        const item = document.getElementById('item').value;
        const price = parseFloat(document.getElementById('price').value);

        // Create a new list item to display the expense
        const listItem = document.createElement('li');
        listItem.textContent = `${item}: $${price.toFixed(2)}`;

        // Add the new expense to the expenses list
        const expensesList = document.getElementById('expenses');
        expensesList.appendChild(listItem);

        // Calculate total expense
        let totalExpense = 0;
        expensesList.querySelectorAll('li').forEach(function (expense) {
            const expenseAmount = parseFloat(expense.textContent.split(': $')[1]);
            totalExpense += expenseAmount;
        });

        // Update total expense display
        document.getElementById('total-expense').textContent = `Total Monthly Expense: $${totalExpense.toFixed(2)}`;

        // Clear the form fields after submission
        groceryForm.reset();
    });
});
