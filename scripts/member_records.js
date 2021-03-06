// Getting Total Issues Count
let refDb = db.collection('issue_added')
totalCountForDay = () => {

    let dayCount = document.getElementsByClassName('day-count')[0]
    let li = document.createElement('li')
    li.classList.add('day-count-li')

    // Completed Count
    let date = new Date()
    let fb = firebase.firestore.Timestamp.now().toDate()

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
totalCountForDay()

// Fetching user to the team member
let filterTableName = document.getElementsByClassName('filterTableName')[0],
    filterCategory = document.getElementsByClassName('filter-category')[0],
    filterDataBtn = document.getElementsByClassName('filterDataBtn')[0],
    issueStatusTable = document.getElementsByClassName("issue-status-table")[0]

filterDataBtn.onclick = () => {
    fetchPendingData()
}

// Fetch Pending Data
fetchPendingData = () => {
    // Regenerating record again
    let regen_rows = document.querySelectorAll('.filterTableRows')
    for (let allRows of regen_rows) {
        allRows.remove()
    }
    refDb.where('issueEndDate', '==', 'Pending').onSnapshot((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            let tr = document.createElement('tr')
            tr.classList.add('filterTableRows')
            tr.setAttribute('data-id', doc.id)

            // Issue Source
            let td_issueSource = document.createElement('td')
            td_issueSource.innerText = doc.data().issueSource
            tr.appendChild(td_issueSource)

            // Issue User Type
            let td_userType = document.createElement('td')
            td_userType.innerText = doc.data().userType
            tr.appendChild(td_userType)

            // Issue User Email
            let td_userEmail = document.createElement('td')
            let userFetchEmail = doc.data().issueUserEmail
            if(userFetchEmail === undefined) {
                td_userEmail.innerText = 'Old Record'
            }
            else {
                td_userEmail.innerText = doc.data().issueUserEmail
            }
            tr.appendChild(td_userEmail)

            // Issue Type
            let td_issueType = document.createElement('td')
            td_issueType.innerText = doc.data().issueType
            tr.appendChild(td_issueType)

            // Issue Start Date
            let td_issueStartDate = document.createElement('td')
            let db_sTime = doc.data().issueStartDate
            let formated_sTime = db_sTime.replace('T', ' , ')
            td_issueStartDate.innerText = formated_sTime
            tr.appendChild(td_issueStartDate)

            // Issue End Date
            let td_issueEndDateData = document.createElement('td')
            let td_issueEndDate = document.createElement('input')
            td_issueEndDate.setAttribute('type', 'datetime-local')
            td_issueEndDate.classList.add('input-boxes')
            td_issueEndDate.classList.add('update-end-time')
            td_issueEndDate.classList.add('form-control')
            td_issueEndDateData.appendChild(td_issueEndDate)
            tr.appendChild(td_issueEndDateData)

            // Issue to NIC
            let td_toNIC = document.createElement('td')
            td_toNIC.innerText = doc.data().toNIC
            tr.appendChild(td_toNIC)

            // Issue Action Update
            let td_issueUpdate = document.createElement('td')
            let update_btn = document.createElement('img')
            update_btn.setAttribute('src', './assets/update.svg')
            update_btn.classList.add('admin_action_delete')
            update_btn.classList.add('admin_action_update')
            td_issueUpdate.appendChild(update_btn)
            tr.appendChild(td_issueUpdate)

            //Updating pending Record
            updatePendingRecord()

            // Issue Action Delete
            let td_issueDelete = document.createElement('td')
            let del_btn = document.createElement('img')
            del_btn.setAttribute('src', './assets/delete.svg')
            del_btn.classList.add('admin_action_delete')
            td_issueDelete.appendChild(del_btn)
            tr.appendChild(td_issueDelete)

            issueStatusTable.appendChild(tr)

        })
    })
}

updatePendingRecord = () => {
    let updateBtns = document.getElementsByClassName('admin_action_update')
    for (let updateBtn of updateBtns) {
        updateBtn.onclick = (e) => {
            let timeDateInput = e.target.parentElement.parentElement.childNodes[5].childNodes[0].value
            console.log(timeDateInput);
            if (timeDateInput === "") {
                alert("Issue End Time cannot be empty")
            }
            else {
                let targetRow = e.target.parentElement.parentElement.getAttribute('data-id')
                refDb.doc(targetRow).update({
                    issueEndDate: e.target.parentElement.parentElement.childNodes[5].childNodes[0].value,
                    update_serverTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
        }
    }
}