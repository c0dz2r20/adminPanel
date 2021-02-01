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
    recordsTable = document.getElementsByClassName('recordsTable')[0],
    reportSource = document.getElementsByClassName('reportSource')[0],
    reportUserType = document.getElementsByClassName('reportUserType')[0],
    reportDates = document.getElementsByClassName('reportDates')[0],
    reportIssueType = document.getElementsByClassName('reportIssueType')[0],
    reportToNic = document.getElementsByClassName('reportToNic')[0],
    filterData=  document.getElementsByClassName('filterData')[0],
    reportIssueTypeHeader = document.getElementById('reportIssueTypeHeader')

filterData.onclick = (e) => {
    e.preventDefault()
    if(reportIssueType.value === "Issue Type") {
        alert ('Select both the criterias to filter.')
    }

   
    else {
        let refDb = db.collection('issue_added')
        refDb.where("issueType", "==", reportIssueType.value).get().then((snapshot) => {

            let pendingList = document.querySelectorAll(".pending")
            for (let removeOldData of pendingList) {
                removeOldData.remove()
            }
           
            if(snapshot.size === 0) {
                alert ('No Records Found')
            }
            else {
                
                snapshot.forEach((doc) => {
                    let tr = document.createElement("tr")
                    tr.classList.add('pending')
    
                    // Mail Report
                    let report_mail = document.createElement('td')
                    if(doc.data().issueSource === "Mail")
                    {
                        report_mail.innerText = doc.data().issueSource
                    }
                    else {
                        report_mail.innerText = "-"
                    }
                    tr.appendChild(report_mail)
    
                    // Call Report
                    let report_call = document.createElement('td')
                    if(doc.data().issueSource === "Call")
                    {
                        report_call.innerText = doc.data().issueSource
                    }
                    else {
                        report_call.innerText = "-"
                    }
                    tr.appendChild(report_call)
    
                    // Issue Start Date
                    let td_issueStartDate = document.createElement('td')
                    let db_sTime = doc.data().issueStartDate
                    let formated_sTime = db_sTime.replace('T', ' , ')
                    td_issueStartDate.innerText = formated_sTime
                    tr.appendChild(td_issueStartDate)
    
                     // Issue End Date
                    let td_issueEndDate = document.createElement('td')
                    let db_eTime = doc.data().issueEndDate
                    if(db_eTime === "Pending") {
                        td_issueEndDate.innerText = 'Pending'
                    }
                    else {
                        let formated_eTime = db_sTime.replace('T', ' , ')
                        td_issueEndDate.innerText = formated_eTime
                    }
                    tr.appendChild(td_issueEndDate)
    
                    // Issue to NIC
                    let td_toNIC = document.createElement('td')
                    td_toNIC.innerText = doc.data().toNIC
                    tr.appendChild(td_toNIC)
    
                    recordsTable.appendChild(tr)
    
                })
            }
        })
    }
}