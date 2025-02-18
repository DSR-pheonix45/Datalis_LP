// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcNwbW6KW9V4CyqOnZECpluaBCkdmlTMU",
    authDomain: "datalis.firebaseapp.com",
    projectId: "datalis",
    storageBucket: "datalis.firebasestorage.app",
    messagingSenderId: "14193813074",
    appId: "1:14193813074:web:7ddf8acccc96a97551a18b",
    measurementId: "G-5P5F63WVQC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginClose = document.getElementById('loginClose');
    const signupClose = document.getElementById('signupClose');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .explore-btn, .learn-more-btn');

    // Handle CTA button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!auth.currentUser) {
                resetErrors();
                signupModal.style.display = "block";
            } else {
                window.location.href = 'https://datalis.streamlit.app';
            }
        });
    });

    // Error Handler
    function handleAuthError(error, elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'block';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorElement.textContent = 'This email is already registered';
                break;
            case 'auth/invalid-email':
                errorElement.textContent = 'Please enter a valid email address';
                break;
            case 'auth/weak-password':
                errorElement.textContent = 'Password should be at least 6 characters';
                break;
            case 'auth/user-not-found':
                errorElement.textContent = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                errorElement.textContent = 'Incorrect password';
                break;
            default:
                errorElement.textContent = 'An error occurred. Please try again';
        }

        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    // Reset Errors
    function resetErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
    }

    // Login Handler
    document.getElementById('submitLogin').addEventListener('click', async () => {
        resetErrors();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('Login successful!');
            localStorage.setItem('userEmail', userCredential.user.email);
            window.location.href = 'https://datalis.streamlit.app';
        } catch (error) {
            console.error("Login error:", error);
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                handleAuthError(error, 'loginEmailError');
            } else if (error.code === 'auth/wrong-password') {
                handleAuthError(error, 'loginPasswordError');
            } else {
                handleAuthError(error, 'loginEmailError');
            }
        }
    });

    // Signup Handler
    document.getElementById('submitSignup').addEventListener('click', async () => {
        resetErrors();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const company = document.getElementById('signupCompany').value;
        const password = document.getElementById('signupPassword').value;

        if (name.length < 2 || company.length < 2) {
            handleAuthError({ code: 'custom/invalid-input' }, 'nameError');
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userCompany', company);
            
            console.log("Signup successful!");
            window.location.href = 'https://datalis.streamlit.app';
        } catch (error) {
            console.error("Signup error:", error);
            handleAuthError(error, 'emailError');
        }
    });

    // Modal Controls
    loginBtn.addEventListener('click', () => {
        if (!auth.currentUser) {
            resetErrors();
            loginModal.style.display = "block";
        }
    });

    signupBtn.addEventListener('click', () => {
        if (!auth.currentUser && signupBtn.textContent === 'Register Now') {
            resetErrors();
            signupModal.style.display = "block";
        }
    });

    // Close Handlers
    [loginClose, signupClose].forEach(btn => {
        btn.addEventListener('click', () => {
            resetErrors();
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        });
    });

    // Switch Between Modals
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        resetErrors();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        resetErrors();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    // Outside Click Handler
    window.onclick = (event) => {
        if (event.target === loginModal || event.target === signupModal) {
            resetErrors();
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        }
    };

    // Auth State Observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User is signed in:', user.email);
            loginBtn.style.display = 'none';
            signupBtn.textContent = 'Dashboard';
            signupBtn.onclick = () => window.location.href = 'https://datalis.streamlit.app';
            
            // Update CTA buttons for logged-in users
            ctaButtons.forEach(button => {
                button.textContent = 'Go to Dashboard';
            });
        } else {
            console.log('No user is signed in.');
            loginBtn.style.display = 'block';
            signupBtn.textContent = 'Register Now';
            signupBtn.onclick = () => signupModal.style.display = "block";
            
            // Reset CTA buttons for logged-out users
            ctaButtons.forEach(button => {
                if (button.classList.contains('explore-btn')) {
                    button.textContent = 'Explore Features';
                } else if (button.classList.contains('learn-more-btn')) {
                    button.textContent = 'Learn More';
                } else {
                    button.textContent = 'Start Free Trial';
                }
            });
        }
    });
});