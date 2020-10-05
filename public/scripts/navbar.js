const backdrop = document.querySelector("#backdrop");
const trigger = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const currentUserHeader = document.querySelector("#currentUserHeader");

trigger.addEventListener("pointerdown", function () {
  menu.classList.toggle("open");
  backdrop.classList.toggle("visible", menu.classList.contains("open"));
});

backdrop.addEventListener("pointerdown", function () {
  menu.classList.remove("open");
  backdrop.classList.remove("visible");
});

const setupUI = (user_auth => {
  if (user_auth) {
    // toggle UI elements if logged in
    loggedInLinks.forEach(item => item.style.display = "block");
    loggedOutLinks.forEach(item => item.style.display = "none");
  } else {
    // toggle UI elements if logged out
    loggedInLinks.forEach(item => item.style.display = "none");
    loggedOutLinks.forEach(item => item.style.display = "block");
  }
});

// Setup the UI with user-specific information
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
    usersRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.id === user.uid) {
          console.log(doc.data().username);
          currentUserHeader.textContent = doc.data().username;
        }
      });
    });
  } else {
    setupUI();
    currentUserHeader.textContent = "Fennec Games";
  }
})


