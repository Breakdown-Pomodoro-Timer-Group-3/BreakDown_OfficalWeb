// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
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

// Ensure script runs after page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    const submit = document.getElementById("submit");

    submit.addEventListener("click", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful! Redirecting to Timer...");
                window.location.href = "Timer.html";
            })
            .catch((error) => {
                alert(`Login failed: ${error.message}`);
            });
    });
});
