
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
    create_issue_btn = document.getElementsByClassName('create_issue_btn')[0],
    create_tonic = document.getElementsByClassName("to_nic")[0],
    create_issue_source = document.getElementsByClassName('create_issue_source')[0],
    create_issue_type = document.getElementsByClassName('create_issue_type')[0],
    create_start_time = document.getElementsByClassName('create_start_time')[0],
    create_end_time = document.getElementsByClassName('create_end_time')[0],
    create_user_type = document.getElementsByClassName('create_user_type')[0]

create_issue_btn.onclick = () => {
    if(create_issue_source.value === 'Issue Source') {
        alert('Select valid Source Type')
    }
    else if(create_issue_type.value === 'Issue Type'){
        alert('Select valid Issue Type')
    }
    else if(create_user_type.value === 'User Type') {
        alert('Select valid User Type')
    }
    else if (create_start_time.value === "") {
        alert ('Provide Issue Start Date')
    }
    else if (create_end_time.value === "") {
        alert ('Provide Issue Close Time')
    }
    else if (create_tonic.value === 'Referred to NIC') {
        alert (' Select whether issue is referred to NIC ')
    }
    else {
        recordtoDb()
        alert ('Issue logged successfully  !!! ')
        create_issue_source.value = 'Issue Source'
        create_issue_type.value = 'Issue Type'
        create_user_type.value = 'User Type'
        create_start_time.value = ""
        create_end_time.value = ""
        create_tonic.value = 'Referred to NIC'
    }
}
recordtoDb = () => {
    db_issue_logged = db.collection('issue_added').doc()
    db_issue_logged.set({
        issueSource: create_issue_source.value,
        userType: create_user_type.value,
        issueType: create_issue_type.value,
        issueStartDate: create_start_time.value,
        issueEndDate: create_end_time.value,
        toNIC: create_tonic.value
    })
}
db_attendance = db.collection('attendance').doc()
let attendance = document.getElementsByClassName("mark-attendance")[0]
// attendance.onclick = () => {
//     db_attendance
//         .set({
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             attendanceButtonColor: '75cfb8'
//         })
//         .then(() => {
//             alert('Attendance is marked for the day for details check the Attendance section')
//         })
//     db.collection("attendance").orderBy('timestamp', 'desc').limit(1).get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
            
//             attendance.style.backgroundColor = "#" + doc.data().attendanceButtonColor
//             attendance.innerText = 'Punched In'
  
//         })
//     })
    
// }



if (attendance.innerText === 'Punch In') {
    alert('mark your attendance')
}
else {
    attendance.onclick = () => {
            db_attendance
                .set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    attendanceButtonColor: '75cfb8'
                })
                .then(() => {
                    alert('Attendance is marked for the day for details check the Attendance section')
                    attendance.innerText = 'Punched In'
                })
            // db.collection("attendance").orderBy('timestamp', 'desc').limit(1).get().then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
                    
            //         attendance.style.backgroundColor = "#" + doc.data().attendanceButtonColor
            //         attendance.innerText = 'Punched In'
          
            //     })
            // })
            
        }
}