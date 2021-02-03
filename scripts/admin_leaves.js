let 
db_leaves = db.collection('leave_requests')

leave_details_db = () => {
   let member_leaves_table_body = document.getElementsByClassName('admin_leave_table_body')[0]
   db_leaves.where("leaveStatus", "==", "Pending").onSnapshot((querySnapshot) => {

        // Regenrating Table rows again
        let adminLeavesClass = document.querySelectorAll(".admin-leaves-class")
        for(let removeOldData of adminLeavesClass) {
            removeOldData.remove()
        }
       querySnapshot.forEach((doc) => {

           let tr = document.createElement('tr')
           tr.classList.add('admin-leaves-class')
           tr.setAttribute('data-id', doc.id)
           
           // Leave Request Details
           let td_leave_details = document.createElement('td')
           td_leave_details.innerText = doc.data().leaveDetails
           td_leave_details.style.wordWrap = 'break-word'
           td_leave_details.style.verticalAlign = "middle"
           td_leave_details.style.width = '350px'
           tr.appendChild(td_leave_details)

           // Leave Generated on
           let td_logTime = document.createElement('td')
           let outT = doc.data().logTime.seconds
           let n = new Date()
           n.setTime(outT * 1000)
           td_logTime.innerText = n
           tr.appendChild(td_logTime)
           
           //  Leave Peroid Details
           let td_leave_period = document.createElement('td')
           td_leave_period.style.verticalAlign = "middle"
           td_leave_period.innerText = `${doc.data().leaveStartDate} :: ${doc.data().leaveEndDate}`
           tr.appendChild(td_leave_period)
            
           // Revoke Request
           let td_action = document.createElement('td')

           // Accept
           let accept = document.createElement('img')
           accept.setAttribute('src','./assets/accept.svg')
           accept.setAttribute('id', 'admin-accept-leave')
           accept.classList.add('admin_action_accept')
           td_action.appendChild(accept)

           // Reject
           let reject = document.createElement('img')
           reject.setAttribute('src','./assets/reject.svg')
           accept.setAttribute('id', 'admin-reject-leave')
           reject.classList.add('admin_action_reject')
           td_action.appendChild(reject)
           tr.appendChild(td_action)
           
           member_leaves_table_body.appendChild(tr)

           rejectLeave()
           acceptLeave()
            
       })
   })
}

rejectLeave = () => {
    let rejectLeaves = document.getElementsByClassName("admin_action_reject")
    for(let rejectLeave of rejectLeaves) {
        rejectLeave.onclick = (e) => {
            let reason = prompt('Provide reason for reject')
            alert ('Request denied with reason' + "\n"  + reason)
            let targetRow = e.target.parentElement.parentElement.getAttribute('data-id')
            db_leaves.doc(targetRow).update({
                leaveStatus: 'Rejected',
                modComments: reason,
                requestUpdateLogTime: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }
}

acceptLeave = () => {
    let acceptLeaves = document.getElementsByClassName('admin_action_accept')
    for(let acceptLeave of acceptLeaves) {
        acceptLeave.onclick = (e) => {
            let targetRow = e.target.parentElement.parentElement.getAttribute('data-id')
            db_leaves.doc(targetRow).update({
                leaveStatus: 'Approved',
                requestUpdateLogTime: firebase.firestore.FieldValue.serverTimestamp()
            })
            alert ("Leave approved")
            
        }
    }
}

leave_details_db()

leavesResponded = () => {
    let adminLeavesResponded = document.getElementsByClassName('admin_leave_replied_table_body')[0]
    db_leaves.where("leaveStatus", "!=", "Pending").onSnapshot((querySnapshot) => {

        // Regenrating Table rows again
        let adminLeavesClass = document.querySelectorAll(".admin-leaves-updated")
        for(let removeOldData of adminLeavesClass) {
            removeOldData.remove()
        }
       querySnapshot.forEach((doc) => {

           let tr = document.createElement('tr')
           tr.classList.add('admin-leaves-updated')
           tr.setAttribute('data-id', doc.id)
           
           // Leave Request Details
           let td_leave_details = document.createElement('td')
           td_leave_details.innerText = doc.data().leaveDetails
           td_leave_details.style.wordWrap = 'break-word'
           td_leave_details.style.verticalAlign = "middle"
           td_leave_details.style.width = '350px'
           tr.appendChild(td_leave_details)

           // Leave Generated on
           let td_logTime = document.createElement('td')
           let outT = doc.data().logTime.seconds
           let n = new Date()
           n.setTime(outT * 1000)
           td_logTime.innerText = n
           tr.appendChild(td_logTime)
           
           //  Leave Period Details
           let td_leave_period = document.createElement('td')
           td_leave_period.style.verticalAlign = "middle"
           td_leave_period.innerText = doc.data().leaveStartDate + "\n"  + doc.data().leaveEndDate
           tr.appendChild(td_leave_period)

           //  Leave Period Status
           let td_leave_status = document.createElement('td')
           td_leave_status.style.verticalAlign = "middle"
           let updateT = doc.data().requestUpdateLogTime.seconds
           let updateD = new Date()
           updateD.setTime(updateT * 1000)
           td_leave_status.innerText = doc.data().leaveStatus + " on " + "\n" + updateD
           tr.appendChild(td_leave_status)

           // Mod Comments
           let td_modComments = document.createElement("td")
           td_modComments.style.verticalAlign = "middle"
           td_modComments.innerText = doc.data().modComments
           tr.appendChild(td_modComments)

           adminLeavesResponded.appendChild(tr)
       })
   })
}
leavesResponded()
