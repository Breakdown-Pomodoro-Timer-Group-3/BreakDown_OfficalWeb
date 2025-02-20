// Import the functions you need from the SDKs
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
    // Submit button
    const submit = document.getElementById("submit");

    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form from reloading

        // Fetch input values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate input
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        // Firebase sign-in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("✅ Login successful:", user);
                alert("Login successful! Redirecting to Timer...");

                // Redirect to Timer page
                window.location.href = "Timer.html";
            })
            .catch((error) => {
                alert(`❌ Login failed: ${error.message}`);
                console.error("Login error:", error);
            });
    });
});
