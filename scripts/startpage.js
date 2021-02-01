var firebaseConfig = {
    apiKey: "AIzaSyALFeMcSa3Sw3nigGK4JRyJSE3LKPvyeRw",
    authDomain: "adminpanel-da9d9.firebaseapp.com",
    projectId: "adminpanel-da9d9",
    storageBucket: "adminpanel-da9d9.appspot.com",
    messagingSenderId: "130078402633",
    appId: "1:130078402633:web:7e1cf2b82b90f9a7e17798",
    measurementId: "G-382QL62H9W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 let db = firebase.firestore(),
    loginPageEmail = document.getElementsByClassName('login-page-email')[0],
    loginPagePass = document.getElementsByClassName('login-page-pass')[0],
    loginBtn = document.getElementsByClassName('login-btn')[0]

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...
  } else {
    alert('Some Error')
  }
});
loginBtn.onclick = e => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(loginPageEmail.value, loginPagePass.value).then(cred => {
      alert('Correct Credentials')
      console.log(cred.user); 
    }).catch(error => {
      alert(error.message);
    })
}
