t found');
            }
        }

        function getMonthlyExpenses() {
            const month = parseInt(document.getElementById('month').value);
            const year = parseInt(document.getElementById('year').value);
            const total = purchases.reduce((acc, purchase) => {
                if (purchase.date.getMonth() + 1 === month && purchase.date.getFullYear() === year) {
                    return acc + purchase.price;
                }
                return acc;
            }, 0);
            document.getElementById('expensesResult').innerText = "Total Expenses: $" + total.toFixed(2);
        }
