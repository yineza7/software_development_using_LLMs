import tkinter as tk
from tkinter import messagebox
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import os

# Encryption function
def encrypt_data(data, key):
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode(), AES.block_size))
    iv = cipher.iv
    return iv + ct_bytes

# Function to write encrypted data to a file
def write_to_file(encrypted_data):
    with open('encrypted_data.bin', 'wb') as f:
        f.write(encrypted_data)
    messagebox.showinfo("Success", "Data has been encrypted and saved to 'encrypted_data.bin'")

# Event handler for the 'Encrypt' button
def encrypt_and_save():
    data = data_entry.get()
    key = key_entry.get().encode()
    if len(key) != 16:
        messagebox.showerror("Error", "Key must be 16 bytes long")
        return
    encrypted_data = encrypt_data(data, key)
    write_to_file(encrypted_data)

# Create the main window
root = tk.Tk()
root.title("Encrypt Data")

# Create GUI elements
tk.Label(root, text="Data:").pack()
data_entry = tk.Entry(root)
data_entry.pack()

tk.Label(root, text="Key (16 bytes):").pack()
key_entry = tk.Entry(root, show="*")
key_entry.pack()

encrypt_button = tk.Button(root, text="Encrypt", command=encrypt_and_save)
encrypt_button.pack()

# Run the application
root.mainloop()
