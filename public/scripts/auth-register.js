//  Sign-up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    // get user info
    const username_input = signupForm['signup-username'].value;
    const email_input = signupForm['signup-email'].value;
    const password_input = signupForm['signup-password'].value;
   
    // by: vimtaai-->
    // Sign up - Auth part
    const cred = await auth.createUserWithEmailAndPassword(email_input, password_input);
    
      // Sign up - Firestore part
      let user = firebase.auth().currentUser;
      if(user != null) {
        let temp = usersRef.doc(user.uid);
        await temp.set({
          "username": username_input,
          "email": email_input,
          "pictureURL": "",
          "games": [],
          "friends": [],
          "date": firebase.firestore.Timestamp.now()
        });
      }
      window.location.href = "../profile.html";
});