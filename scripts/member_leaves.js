
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

db_leaves = db.collection('leave_requests')
leave_request_toDb = () => {
    db_leaves.doc().set({
        leaveDetails: leave_details.value,
        leaveStartDate: leave_start_date.value,
        leaveEndDate: leave_end_date.value,
        leaveStatus: 'Pending'
    })
}

leave_details_db = () => {
    let member_leaves_table_body = document.getElementsByClassName('member_leaves_table_body')[0]
    db_leaves.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let tr = document.createElement('tr')
            
            // Leave Request Details
            let td_leave_details = document.createElement('td')
            td_leave_details.innerText = doc.data().leaveDetails
            td_leave_details.style.wordWrap = 'break-word'
            td_leave_details.style.verticalAlign = "middle"
            td_leave_details.style.width = '350px'
            tr.appendChild(td_leave_details)
            
           //  Leave Peroid Details
           let td_leave_period = document.createElement('td')
           td_leave_period.style.verticalAlign = "middle"
           td_leave_period.innerText = `${doc.data().leaveStartDate} :: ${doc.data().leaveEndDate}`
           tr.appendChild(td_leave_period)
            
            // Leave Status
            let td_leave_status = document.createElement("td")
            td_leave_status.style.verticalAlign = "middle"
            td_leave_status.innerText = doc.data().leaveStatus
            tr.appendChild(td_leave_status)
            
            // Revoke Request
            let td_delete_icon = document.createElement('img')
            td_delete_icon.setAttribute('src', './assets/delete.svg')
            td_delete_icon.classList.add('admin_action_delete')
            td_delete_icon.style.verticalAlign = "middle"
            tr.appendChild(td_delete_icon)
            
            member_leaves_table_body.appendChild(tr)
        })
    })
}

leave_details_db()