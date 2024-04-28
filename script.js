let dailyGroceries = {};
let monthlyGroceries = {};

function addItem(event) {
    event.preventDefault(); // Prevent form submission

    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const date = document.getElementById('date').value;
    
    if (!isNaN(price) && price > 0 && date) {
        // Record daily expense
        if (!dailyGroceries[date]) {
            dailyGroceries[date] = {};
        }
        if (dailyGroceries[date][item]) {
            dailyGroceries[date][item] += price;
        } else {
            dailyGroceries[date][item] = price;
        }
        
        // Record monthly expense
        const month = date.substring(0, 7); // Extract YYYY-MM format
        if (!monthlyGroceries[month]) {
            monthlyGroceries[month] = {};
        }
        if (monthlyGroceries[month][item]) {
            monthlyGroceries[month][item] += price;
        } else {
            monthlyGroceries[month][item] = price;
        }

        updateDailyReport();
        updateMonthlyReport();
    } else {
        alert('Please enter a valid price and date.');
    }

    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
    document.getElementById('date').value = '';
}

function updateDailyReport() {
    const reportDiv = document.getElementById('dailyReportContent');
    reportDiv.innerHTML = '';
    let totalExpenses = 0;

    for (const [date, items] of Object.entries(dailyGroceries)) {
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = `Date: ${date}`;
        reportDiv.appendChild(dateHeader);

        for (const [item, price] of Object.entries(items)) {
            const expense = document.createElement('p');
            expense.textContent = `${item}: $${price.toFixed(2)}`;
            reportDiv.appendChild(expense);
            totalExpenses += price;
        }
    }

    const total = document.createElement('p');
    total.textContent = `Total Daily Expenses: $${totalExpenses.toFixed(2)}`;
    reportDiv.appendChild(total);
}

function updateMonthlyReport() {
    const reportDiv = document.getElementById('monthlyReportContent');
    reportDiv.innerHTML = '';
    let totalExpenses = 0;

    // Mapping of month number to month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (const [month, items] of Object.entries(monthlyGroceries)) {
        // Extract year and month from the month key
        const [year, monthNumber] = month.split('-');
        const monthName = monthNames[parseInt(monthNumber) - 1]; // Subtract 1 to get correct index
        
        const header = document.createElement('h3');
        header.textContent = `Grocery Expenses for the month of "${monthName} ${year}":`;
        reportDiv.appendChild(header);

        for (const [item, price] of Object.entries(items)) {
            const expense = document.createElement('p');
            expense.textContent = `${item}: $${price.toFixed(2)}`;
            reportDiv.appendChild(expense);
            totalExpenses += price;
        }
    }

    const total = document.createElement('p');
    total.textContent = `Total Monthly Expenses: $${totalExpenses.toFixed(2)}`;
    reportDiv.appendChild(total);
}

document.getElementById('expenseForm').addEventListener('submit', addItem);

updateDailyReport();
updateMonthlyReport();
