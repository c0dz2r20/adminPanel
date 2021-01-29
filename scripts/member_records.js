
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

let db = firebase.firestore()

// Getting Total Issues Count
totalCountForDay = () => {

    let dayCount = document.getElementsByClassName('day-count')[0]
    let refDb = db.collection('issue_added')
    let li = document.createElement('li')
    li.classList.add('day-count-li')

    // Completed Count
    let date  = new Date()
    let fb = firebase.firestore.Timestamp.now().toDate()
    console.log(fb);
    // if(refDb.where('issueEndDate', '!=', fb)) {
    //     console.log('match found');

        //Completed Count
        refDb.where('issueEndDate', '!=', 'NP').onSnapshot((querySnapshot) => {
    
            // Regenrating Table rows again
            let completedList = document.querySelectorAll(".completed")
            for(let removeOldData of completedList) {
                removeOldData.remove()
            }
            let size = querySnapshot.size
            let completed = document.createElement("span")
            completed.classList.add('completed')
            completed.innerText = ' Total Completed - ' + size
            li.appendChild(completed)
            dayCount.appendChild(li)
        })

        // Pending Count
        refDb.where('issueEndDate', '==', 'NP').onSnapshot((querySnapshot) => {

            let pendingList = document.querySelectorAll(".pending")
            for(let removeOldData of pendingList) {
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
                for(let removeOldData of nicList) {
                    removeOldData.remove()
                }
                let size = querySnapshot.size
                let pendingfromNic = document.createElement("span")
                pendingfromNic.classList.add('pendingfromNic')
                pendingfromNic.innerText = ' Total pending with NIC - ' + size
                li.appendChild(pendingfromNic)
                dayCount.appendChild(li)
        })
        
    // }
    // else {
    //     console.log(' No data of current day');
    //     let noRecord = document.createElement("li")
    //     li.innerText = "No records added for the day"
    //     dayCount.appendChild(li)
    // }

}
totalCountForDay()