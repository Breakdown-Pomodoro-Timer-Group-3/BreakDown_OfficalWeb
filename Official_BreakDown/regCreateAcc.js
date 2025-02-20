// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLRZdDnR7OZ9hb1gS9Mg3VkmUk-xoKGXs",
  authDomain: "login-example-13cf0.firebaseapp.com",
  projectId: "login-example-13cf0",
  storageBucket: "login-example-13cf0.firebasestorage.app",
  messagingSenderId: "709608728349",
  appId: "1:709608728349:web:7eb6f629dccb6c96aea3f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Clear form fields when page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm_password").value = "";
});

// Listen for the signup event
document.getElementById('submitSignup').addEventListener("click", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirm_password = document.getElementById('confirm_password').value.trim();

    if (password !== confirm_password) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info in Firestore
        await setDoc(doc(db, "users", user.uid), { email, fullname });

        alert("Account created successfully! Redirecting to login...");
        window.location.href = "Login.html"; 

    } catch (error) {
        alert(error.message);
    }
});
