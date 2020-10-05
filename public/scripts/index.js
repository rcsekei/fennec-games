function playButton() {
    auth.onAuthStateChanged(user => {
        if(user) {
            // Itt nem sikerül hozzáadni a firestore-ban a "games" tömbhöz a space-invader stringet
            usersRef.doc(user.uid).update({
                games: firebase.firestore.FieldValue.arrayUnion('space-invader')
            });
            window.location.href = "spaceinvader.html";
        } else {
            window.location.href = "login.html";
        }
    });
}