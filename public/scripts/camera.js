let button = document.getElementById("pic-upload");
let imgDiv = document.getElementById("prof");
button.addEventListener("click", (ev) => {
  let icon = document.getElementById("i");
  let input = document.getElementById('capture');
  let img = document.getElementById('profile-pic');

  if (input.files[0].type.indexOf("image/") > -1) {
    img.src = URL.createObjectURL(input.files[0]);
    icon.style.display = "none";
    img.style.display = "block";
    img.classList.add = "shown";
    imgDiv.style.display = "inblock-line";
  }

  var file = input.files[0];
  var metadata = {
    contentType: 'image/jpeg'
  };
  var uploadTask = storageRef.child('profile-pictures/' + file.name).put(file, metadata);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log("User doesn't have permission to access the object");
          break;

        case 'storage/canceled':
          console.log("User canceled the upload");
          break;

        case 'storage/unknown':
          console.log("Unknown error occurred, inspect error.serverResponse");
          break;
      }
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        auth.onAuthStateChanged(function (user_auth) {
          usersRef.doc(user_auth.uid).update({
            "pictureURL": downloadURL
          })
            .then(function () {
              console.log("Document successfully updated!");
            });
        });
      });
    });
});
