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

// Referencing fields here
let admin_create_user_userType = document.getElementById('admin-create-user-userType'),
   admin_create_user_form = document.getElementsByClassName('admin-create-user-form')[0],
   admin_create_user_firstName = document.getElementById('admin-create-user-firstName'),
   admin_create_user_lastName = document.getElementById('admin-create-user-lastName'),
   admin_create_user_email = document.getElementById('admin-create-user-email'),
   admin_create_user_pass,
   admin_create_user_mobileNumber = document.getElementById('admin-create-user-mobileNumber'),
   admin_create_user_btn = document.getElementsByClassName('admin-create-user-btn')[0]
   
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
   else if (admin_create_user_mobileNumber === '') {
      alert ('Mobile Number is not valid !!!')
   }
   else {
      console.log(admin_create_user_userType.value, admin_create_user_firstName.value, admin_create_user_lastName.value, admin_create_user_email.value, admin_create_user_mobileNumber.value);
      alert('User created successfully !!!')
      
   }
}
