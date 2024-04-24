document.addEventListener('DOMContentLoaded', function () {
    // Expense info form
    const expenseInfoForm = document.getElementById('expense-info-form');
    expenseInfoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get values from the form
        const name = document.getElementById('name').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        // Save expense information to CSV file
        saveExpenseInfoToCSV(name, month, year);

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

        // Add the new expense to the expenses list
        addExpense(item, price);

        // Clear the form fields after submission
        groceryForm.reset();
    });

    // Function to save expense information to CSV file
    function saveExpenseInfoToCSV(name, month, year) {
        const csvData = `${name},${month},${year}\n`;

        // Convert CSV data to a Blob object
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a new File object with the Blob data
        const file = new File([blob], 'expenses.csv', { type: 'text/csv' });

        // Create a new FileReader object
        const reader = new FileReader();

        // Define the function to be executed after reading the file
        reader.onload = function(event) {
            // Append the new data to the existing file data
            const updatedCSV = event.target.result + csvData;

            // Save the updated data to the existing file
            saveToFile(updatedCSV);
        };

        // Read the existing file data as text
        reader.readAsText(file);
    }

    // Function to save data to a file
    function saveToFile(data) {
        // Create a new Blob object with the updated data
        const blob = new Blob([data], { type: 'text/csv' });

        // Create a new URL for the Blob object
        const url = URL.createObjectURL(blob);

        // Create a new link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.csv';

        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Function to add a new expense
    function addExpense(item, price) {
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
    }
});
