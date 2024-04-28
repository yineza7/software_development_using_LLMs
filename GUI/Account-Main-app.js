// Simulated Database
        // Simulated Database
let users = [{ userId: 1, username: "user", password: "pass" }];
        let items = [
            { itemId: "Milk", itemName: "Milk", price: 5.00 },
            { itemId: "Bread", itemName: "Bread", price: 2.50 }
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

        // Check if user is already logged in using local storage
        function checkLoggedIn() {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                alert(`Welcome back, ${storedUser.username}!`);
                document.getElementById('username').value = storedUser.username;
                document.getElementById('password').value = storedUser.password;
                login();
            }
        }

        // Functions for handling operations
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Store user's login status in local storage
                localStorage.setItem('user', JSON.stringify(user));
                alert('Login successful');
            } else {
                const createNewAccount = confirm('Login failed. Do you want to create a new account?');
                if (createNewAccount) {
                    const newUsername = prompt('Enter a new username:');
                    const newPassword = prompt('Enter a new password:');
                    if (newUsername && newPassword) {
                        const newUser = new User(users.length + 1, newUsername, newPassword);
                        users.push(newUser);
                        localStorage.setItem('user', JSON.stringify(newUser));
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
                purchases.push({ purchaseId, date, item, price });
                alert('Purchase recorded');
            } else {
                alert('Item not found');
            }
        }

        function getMonthlyExpenses() {
            const month = parseInt(document.getElementById('month').value);
            const year = parseInt(document.getElementById('year').value);
            const total = purchases.reduce((acc, purchase) => {
                const purchaseDate = new Date(purchase.date);
                if (purchaseDate.getMonth() + 1 === month && purchaseDate.getFullYear() === year) {
                    return acc + purchase.price;
                }
                return acc;
            }, 0);
            document.getElementById('expensesResult').innerText = "Total Expenses: $" + total.toFixed(2);
        }
