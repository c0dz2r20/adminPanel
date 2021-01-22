
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
    leave_details = document.getElementsByClassName('leave-details')[0],
    leave_start_date = document.getElementsByClassName('leave-start-date')[0],
    leave_end_date = document.getElementsByClassName('leave-end-date')[0],
    raise_request = document.getElementsByClassName('raise-request')[0]

raise_request.onclick = () => {
    if(leave_details.value === "") {
        alert('Leave details missing')
    }
    else if (leave_start_date.value === "") {
        alert ('Provide Start Date')
    }
    else if (leave_end_date.value === "") {
        alert ('Provide End Date')
    }
    else {
        leave_request_toDb()
        alert (' Request sent successfully  !!! ')
        leave_details.value = ''
        leave_start_date.value = ''
        leave_end_date.value = ''
    }
}

leave_request_toDb = () => {
    db_leave_request = db.collection('leave_requests').doc()
    db_leave_request.set({
        leaveDetails: leave_details.value,
        leaveStartDate: leave_start_date.value,
        leaveEndDate: leave_end_date.value,
        leaveStatus: 'Pending'
    })
}