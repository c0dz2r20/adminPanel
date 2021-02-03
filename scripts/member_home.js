let 
    create_issue_btn = document.getElementsByClassName('create_issue_btn')[0],
    create_tonic = document.getElementsByClassName("to_nic")[0],
    create_issue_source = document.getElementsByClassName('create_issue_source')[0],
    create_issue_type = document.getElementsByClassName('create_issue_type')[0],
    create_start_time = document.getElementsByClassName('create_start_time')[0],
    create_end_time = document.getElementsByClassName('create_end_time')[0],
    create_user_type = document.getElementsByClassName('create_user_type')[0],
    create_issue_email = document.getElementsByClassName('create-issue-email')[0],
    loggedUserName = document.getElementsByClassName('loggedUserName')[0],
    firstLoginTime = document.getElementsByClassName('first-login')[0]
 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log(uid);
        let user1 = firebase.auth().currentUser
        console.log(user1);
        loggedUserName.innerText = user1.email
        let d = user1.metadata.b
        let x = new Date()
        x.setTime(d)
        let finalDate = x.toString().replace('GMT+0530 (India Standard Time)', "")
        firstLoginTime.innerText = "First Login : " + finalDate
        totalCountForDay()
        create_issue_btn.onclick = (user) => {
            addIssue(user)
        }
    }
    else {
        alert('Some Error')
    }
    });
   
addIssue = (user) => {
    if (create_issue_source.value === 'Issue Source') {
        alert('Select valid Source Type')
    }
    else if (create_issue_type.value === 'Issue Type') {
        alert('Select valid Issue Type')
    }
    else if (create_user_type.value === 'User Type') {
        alert('Select valid User Type')
    }
    else if (create_issue_email.value === "") {
        alert (' Enter user email address ')
    }
    else if (create_start_time.value === "") {
        alert('Provide Issue Start Date')
    }
    else if (create_tonic.value === 'Referred to NIC') {
        alert(' Select whether issue is referred to NIC ')
    }
    else {
        if (create_end_time.value === "") {
            alert("You have not provided Close Time for the issue go to Records to update.")
            db_issue_logged = db.collection('issue_added').doc('user.uid')
            db_issue_logged.set({
                issueSource: create_issue_source.value,
                userType: create_user_type.value,
                issueType: create_issue_type.value,
                issueStartDate: create_start_time.value,
                issueEndDate: "Pending",
                toNIC: create_tonic.value,
                create_serverTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                update_serverTimeStamp: "NA",
                issueUserEmail: create_issue_email.value
            })
        }
        else {
            db_issue_logged = db.collection('issue_added').doc()
            db_issue_logged.set({
                issueSource: create_issue_source.value,
                userType: create_user_type.value,
                issueType: create_issue_type.value,
                issueStartDate: create_start_time.value,
                issueEndDate: create_end_time.value,
                toNIC: create_tonic.value,
                create_serverTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                update_serverTimeStamp: "NA",
                issueUserEmail: create_issue_email.value
            })
        }
        alert('Issue logged successfully  !!! ')
        create_issue_source.value = 'Issue Source'
        create_issue_type.value = 'Issue Type'
        create_user_type.value = 'User Type'
        create_start_time.value = ""
        create_end_time.value = ""
        create_tonic.value = 'Referred to NIC'
        create_issue_email.value = ""
    }
}


totalCountForDay = () => {

    let dayCount = document.getElementsByClassName('day-count')[0]
    let refDb = db.collection('issue_added')
    let li = document.createElement('li')
    li.classList.add('day-count-li')

    // Completed Count
    let date = new Date()
    let fb = firebase.firestore.Timestamp.now().toDate()

    //Completed Count
    refDb.where('issueEndDate', '!=', 'Pending').onSnapshot((querySnapshot) => {

        // Regenrating Table rows again
        let completedList = document.querySelectorAll(".completed")
        for (let removeOldData of completedList) {
            removeOldData.remove()
        }
        let size = querySnapshot.size
        let completed = document.createElement("span")
        completed.classList.add('completed')
        completed.innerText = ' Total completed - ' + size
        li.appendChild(completed)
        dayCount.appendChild(li)
    })

    // Pending Count
    refDb.where('issueEndDate', '==', 'Pending').onSnapshot((querySnapshot) => {

        let pendingList = document.querySelectorAll(".pending")
        for (let removeOldData of pendingList) {
            removeOldData.remove()
        }
        let size = querySnapshot.size
        let pending = document.createElement("span")
        pending.classList.add('pending')
        pending.innerText = ' Total Pending - ' + size
        li.appendChild(pending)
        dayCount.appendChild(li)
    })

    // Sent to NIC
    refDb.where('toNIC', '==', 'Yes').onSnapshot((querySnapshot) => {
        let nicList = document.querySelectorAll(".pendingfromNic")
        for (let removeOldData of nicList) {
            removeOldData.remove()
        }
        let size = querySnapshot.size
        let pendingfromNic = document.createElement("span")
        pendingfromNic.classList.add('pendingfromNic')
        pendingfromNic.innerText = ' Total pending with NIC - ' + size
        li.appendChild(pendingfromNic)
        dayCount.appendChild(li)
    })
}

// totalCountForDay()
