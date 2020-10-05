// Get the current user's username from Firestore
let currentUserName = document.querySelector("#currentUserName");
const friendlist = document.querySelector(".friends-list");
let icon = document.getElementById("i");
let input = document.getElementById('capture');
let img = document.getElementById('profile-pic');

const setupFriendlist = function (firestore_data) {
    let html = '<h3>Friends</h3><table><tr><th>Usernames</th><th>Games</th><th class="delete">Delete</th></tr>';
    firestore_data.friends.forEach(friend => {
        const li = `
                    <tr>
                        <td>${friend}</td>
                        <td>Space Invader</td>
                        <td><button onclick="deleteFriend('${friend}')" class="delete"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `;
        html += li;
    });
    html += "</table>";
    friendlist.innerHTML = html;
};

const deleteFriend = function (name_to_remove) {
    auth.onAuthStateChanged(user => {
        if (user) {
            usersRef.doc(user.uid).update({
                friends: firebase.firestore.FieldValue.arrayRemove(name_to_remove)
            });
        }
    });
}

const setupProfilepic = function (firestore_data) {
    if (firestore_data.pictureURL !== "") {
        img.src = firestore_data.pictureURL;
        icon.style.display = "none";
        img.style.display = "block";
        img.classList.add = "shown";
    }
}

// Add friend
let username_add = document.querySelector("#username");
let addbutton = document.querySelector("#send-request");
addbutton.addEventListener("click", async function (e) {

    if (username_add.value) {
        let success = await usersRef.where("username", "==", username_add.value).get()
            .then(function (querySnapshot) {
                if (!querySnapshot.empty) {
                    auth.onAuthStateChanged(user => {
                        if (user) {
                            usersRef.doc(user.uid).update({
                                friends: firebase.firestore.FieldValue.arrayUnion(username_add.value)
                            });
                        }
                        modal.style.display = "none";
                        backdrop.style.display = "none";
                    });
                    alert("" + username_add.value + " hozzadva!");
                }
                else {
                    alert("" + username_add.value + " nem letezik!");
                }
            })

    }

})

// Setting up friendslist, profile picture and email
document.addEventListener("DOMContentLoaded", function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            currentUserName.textContent = user.email;
            usersRef.doc(user.uid).onSnapshot(function (doc) {
                setupFriendlist(doc.data());
                setupProfilepic(doc.data());
            });
        } else {
            currentUserName.textContent = "Fennec Games";
        }
    });
});