// Redirect, if user is not logged in
document.addEventListener("DOMContentLoaded", function() {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "../login.html";
        }
      });
});