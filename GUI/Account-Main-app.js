// Simulated Database
        let users = [{ userId: 1, username: "user", password: "pass" }];
        let items = [
            { itemId: 1, itemName: "Milk", price: 1.99 },
            { itemId: 2, itemName: "Bread", price: 2.50 }
        ];
        let purchases = [];

        // User class
        class User {
            constructor(userId, username, password) {
                this.userId = userId;
                this.username = username;
                this.password = password;
            }

            login(username, password) {
                return this.username === username && this.password === password;
            }
        }

        // GroceryItem class
        class GroceryItem {
            constructor(itemId, itemName, price) {
                this.itemId = itemId;
                this.itemName = itemName;
                this.price = price;
            }
        }

        // Purchase class
        class Purchase {
            constructor(purchaseId, date, item, price) {
                this.purchaseId = purchaseId;
                this.date = new Date(date);
                this.item = item;
                this.price = price;
            }
        }

        // Functions for handling operations
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let user = users.find(u => u.username === username && u.password === password);
            if (user) {
                alert('Login successful');
            } else {
                const createNewAccount = confirm('Login failed. Do you want to create a new account?');
                if (createNewAccount) {
                    const newUsername = prompt('Enter a new username:');
                    const newPassword = prompt('Enter a new password:');
                    if (newUsername && newPassword) {
                        const newUser = new User(users.length + 1, newUsername, newPassword);
                        users.push(newUser);
                        alert('Account created successfully. You can now login with your new credentials.');
                    } else {
                        alert('Invalid username or password. Please try again.');
                    }
                }
            }
        }

        function recordPurchase() {
            const itemId = parseInt(document.getElementById('item_id').value);
            const price = parseFloat(document.getElementById('price').value);
            const date = document.getElementById('date').value;
            const item = items.find(i => i.itemId === itemId);
            if (item) {
                const purchaseId = purchases.length + 1;
                purchases.push(new Purchase(purchaseId, date, item, price));
                alert('Purchase recorded');
            } else {
                alert('Item not found');
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
