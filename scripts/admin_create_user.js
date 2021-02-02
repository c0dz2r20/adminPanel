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
let db = firebase.firestore();
let auth = firebase.auth()

// Referencing fields here
let admin_create_user_userType = document.getElementById('admin-create-user-userType'),
   admin_create_user_form = document.getElementsByClassName('admin-create-user-form')[0],
   admin_create_user_firstName = document.getElementById('admin-create-user-firstName'),
   admin_create_user_lastName = document.getElementById('admin-create-user-lastName'),
   admin_create_user_email = document.getElementById('admin-create-user-email'),
   admin_create_user_pass,
   admin_create_user_mobileNumber = document.getElementById('admin-create-user-mobileNumber'),
   admin_create_user_btn = document.getElementsByClassName('admin-create-user-btn')[0],
   admin_show_user_table = document.getElementsByClassName('admin_show_user_table')[0],
   admin_show_user_table_body = document.getElementsByClassName('admin_show_user_table_body')[0]
   
admin_create_user_btn.onclick = (e) => {
   e.preventDefault()
   if (admin_create_user_userType.value === 'User Type') {
      alert('User Type is not valid !!!')
   }
   else if (admin_create_user_firstName.value === '') {
      alert('First name is not valid !!!')
   }
   else if (admin_create_user_lastName.value === '') {
      alert('Last name is not valid !!!')
   }
   else if (admin_create_user_email.value === '') {
      alert ('Email is not valid !!!')
   }
   else if (admin_create_user_mobileNumber.value === '' || admin_create_user_mobileNumber.value.length != 10) {
      alert ('Mobile Number is not valid !!!')
   }
   else {
      
      // Adding user to firebase authentication.
      addedUsers()
      let admin_db = db.collection('new_users').doc()
         admin_db.set({
            userType: admin_create_user_userType.value,
            firstName: admin_create_user_firstName.value,
            lastName: admin_create_user_lastName.value,
            pass: 'Admin123$',
            email: admin_create_user_email.value,
            mobileNumber: admin_create_user_mobileNumber.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
         alert('User created successfully !!!')
   }
}

addedUsers = () => {
   let authUser = admin_create_user_email.value;
   let authPass = 'Admin123$'
   auth.createUserWithEmailAndPassword(authUser, authPass)
   .catch(error => {console.log(error);})
   .then((cred) => {
      if (cred.user != null) {
         let displayName = admin_create_user_firstName.value + " " + admin_create_user_lastName.value
        auth.currentUser.updateProfile({
            displayName: displayName,
            phoneNumber : admin_create_user_mobileNumber.value
         })
         cred.user.sendEmailVerification()
         // Clearing values on submit
         admin_create_user_userType.value = 'User Type'
         admin_create_user_firstName.value = ''
         admin_create_user_lastName.value = ''
         admin_create_user_email.value = ''
         admin_create_user_mobileNumber.value = ''
      }

      else {
         console.log('Unable to create users.');
      }
   })
   
}

// Showing Created users in the table
showCreatedUser = () => {
   let show_admin_data = db.collection('new_users')
   
   show_admin_data.orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
      let admin_remove_old_data =  document.querySelectorAll('.admin-table-class-name')
      for(delRows of admin_remove_old_data) {
         delRows.remove()
      }
      querySnapshot.forEach(function(doc) {
         creatingTable(doc)
      })
   })
}
showCreatedUser()

creatingTable = doc => {
   let body_row = document.createElement('tr')
   body_row.classList.add('admin-table-class-name')

   // Table Data for First Name and Last Name
   let td_name = document.createElement('td')
   td_name.innerText = doc.data().firstName + ' ' + doc.data().lastName
   body_row.appendChild(td_name)

   // Table Data for User Type
   let td_userType = document.createElement('td')
   td_userType.innerText = doc.data().userType
   body_row.appendChild(td_userType)

   // Table Data for Email
   let td_email = document.createElement('td')
   td_email.innerText = doc.data().email
   body_row.appendChild(td_email)

   // Table Data for Mobile Number
   let td_mobileNumber = document.createElement('td')
   td_mobileNumber.innerText = doc.data().mobileNumber
   body_row.appendChild(td_mobileNumber)

   // Table Data for Created On
   let td_logTime = document.createElement('td')
   let outT = doc.data().timestamp.seconds
   console.log(outT);
   let n = new Date()
   n.setTime(outT * 1000)
   td_logTime.innerText = n
   body_row.appendChild(td_logTime)

   // Table Data for Delete/Edit
   let td_delete_edit = document.createElement('td')
   let td_delete_icon = document.createElement('img')
   td_delete_icon.setAttribute('src', './assets/delete.svg')
   td_delete_icon.classList.add('admin_action_delete')
   td_delete_edit.appendChild(td_delete_icon)

   let td_edit_icon = document.createElement('img')
   td_edit_icon.setAttribute('src', './assets/edit.svg')
   td_edit_icon.classList.add('admin_action_edit')
   td_delete_edit.appendChild(td_edit_icon)

   body_row.appendChild(td_delete_edit)

   // Appending data to row
   admin_show_user_table_body.appendChild(body_row)
}
