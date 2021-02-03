let = 
    loginPageEmail = document.getElementsByClassName('login-page-email')[0],
    loginPagePass = document.getElementsByClassName('login-page-pass')[0],
    loginBtn = document.getElementsByClassName('login-btn')[0],
    

auth.onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
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
      alert("Wrong Credentials");
    })
}
