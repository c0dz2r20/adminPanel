 let 
      tbody = document.getElementsByClassName("member_profile_body")[0]
      refDb = db.collection('new_users'),
      updateProfileBtn = document.getElementsByClassName("update-profile")[0]

firebase.auth().onAuthStateChanged((user) => {
if (user) {
    var uid = user.uid;
    let user1 = firebase.auth().currentUser
    loggedUserName.innerText = user1.email
    let d = user1.metadata.b
    let x = new Date()
    x.setTime(d)
    let finalDate = x.toString().replace('GMT+0530 (India Standard Time)', "")
    firstLoginTime.innerText = "First Login : " + finalDate
    
    something(user)
    
}
else {
    alert('You are logged out')
}
});
something = (user) => {
    console.log(user.uid);
    refDb.where('userId', '==', user.uid).get().then((snapshot) => {
        snapshot.forEach(doc => {
            createTable(doc)
        })
    })
}
// Creating Record table
createTable = (doc) => {
    let tr = document.createElement('tr')
            tr.classList.add('members-leave-class')
            tr.setAttribute('data-id', doc.id)

    // User Login ID
    let td_loginID = document.createElement('td')
    td_loginID.innerText = doc.data().email
    tr.appendChild(td_loginID)

    // User Email
    let td_email = document.createElement('td')
    td_email.innerText = doc.data().email
    td_email.classList.add('user-email')
    tr.appendChild(td_email)

    // User First Name
    let td_firstName = document.createElement('td')
    td_firstName.innerText = doc.data().firstName
    tr.appendChild(td_firstName)

    // User Last Name
    let td_lastName = document.createElement('td')
    td_lastName.innerText = doc.data().lastName
    tr.appendChild(td_lastName)

    // User Mobile Number
    let td_mobileNumber = document.createElement('td')
    td_mobileNumber.classList.add('mobile-number')
    td_mobileNumber.innerText = doc.data().mobileNumber
    tr.appendChild(td_mobileNumber)

    // User Created On
    let td_createdOn = document.createElement('td')
    let outT = doc.data().timestamp.seconds
    let n = new Date()
    n.setTime(outT * 1000)
    td_createdOn.innerText = n
    tr.appendChild(td_createdOn)

    // User Type
    let td_userType = document.createElement('td')
    td_userType.innerText = doc.data().userType
    tr.appendChild(td_userType)

    tbody.appendChild(tr)

    // Finding row and updating profile
    updateProfileByUser(doc)
}

// Finding row and updating profile
updateProfileByUser = (doc) => {
    let mobileRow = document.getElementsByClassName("mobile-number")[0]
    let newEmail = document.getElementById('new_email_id')
    let newMobileNumber = document.getElementById('new_mobile_number')
    updateProfileBtn.onclick = () => {
        let targetRow = mobileRow.parentElement.getAttribute('data-id');
        if(newEmail.value === "" && newMobileNumber.value === "") {
            alert("Input one field to update records")
        }
        else if(newMobileNumber.value === "") {
            refDb.doc(targetRow).update({
                email: newEmail.value,
                lastUpdatedOn: firebase.firestore.FieldValue.serverTimestamp()
            })
            alert("Email updated")
            newEmail.value = ""
        }
        else {
            // Catching mobile number length
            if(newMobileNumber.value.length != 10) {
                alert (' Mobile Number cannot be more or less than 10')
            }
            else {
                refDb.doc(targetRow).update({
                    mobileNumber: newMobileNumber.value,
                    lastUpdatedOn: firebase.firestore.FieldValue.serverTimestamp()
                })
                alert("Mobile Number updated")
                newMobileNumber.value = ""
            }
        }
    }

    // Profile last updated on 
    let ul = document.getElementsByClassName("last-updated-on")[0]
        lastUpdatedOn = () => {

            // Regenrating Table rows again
            let memberLeave = document.querySelectorAll('.last-updated-li')
            for(let mleave of memberLeave) {
                mleave.remove();                
            }
            let outT = doc.data().lastUpdatedOn.seconds
            let n = new Date()
            n.setTime(outT * 1000)
            let li = document.createElement("li")
            li.classList.add('last-updated-li')
            li.innerText = 'Profile last updated on: ' + n
            ul.appendChild(li)
        }
        lastUpdatedOn()
}




