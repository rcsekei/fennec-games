// Log-in
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Log in - Auth part
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.pathname = "../profile.html";
    });
})

