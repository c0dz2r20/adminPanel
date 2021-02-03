
 
let = 
    loginPageEmail = document.getElementsByClassName('login-page-email')[0],
    loginPagePass = document.getElementsByClassName('login-page-pass')[0],
    loginBtn = document.getElementsByClassName('login-btn')[0],

    loginBtn.onclick = e => {
        e.preventDefault()
        if(loginPageEmail.value === "" && loginPagePass.value === "") {
          alert (' Enter both Email and Password ')
        }
        else {
          
          firebase.auth().signInWithEmailAndPassword(loginPageEmail.value, loginPagePass.value).then(cred => {
            auth.onAuthStateChanged((user) => {
              if (user) {
                if(user.email === 'ankitjeetthakur@gmail.com'){
                  window.location.assign('admin-home.html')
                }
                else {
                  window.location.assign('member-home.html')
                }
              } 
            });
          }).catch(error => {
            alert("Wrong Credentials");
          })
        }
    }


