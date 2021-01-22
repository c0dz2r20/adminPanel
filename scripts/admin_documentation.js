
var firebaseConfig = {
    apiKey: "AIzaSyALFeMcSa3Sw3nigGK4JRyJSE3LKPvyeRw",
    authDomain: "adminpanel-da9d9.firebaseapp.com",
    projectId: "adminpanel-da9d9",
    storageBucket: "adminpanel-da9d9.appspot.com",
    messagingSenderId: "130078402633",
    appId: "1:130078402633:web:7e1cf2b82b90f9a7e17798",
    measurementId: "G-382QL62H9W",
    storageBucket: 'gs://adminpanel-da9d9.appspot.com'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let db = firebase.firestore(),
    admin_document_upload_btn = document.getElementById('admin_document_upload_btn'),
    admin_document_upload_input = document.getElementsByClassName('admin_document_upload_input')[0],
    admin_document_form = document.getElementsByClassName('admin_document_form')[0]
    storageRef = firebase.storage().ref('documents'),
  

// Uploading document to the database
admin_document_upload_btn.onclick = (e) => {

    e.preventDefault()

    // Getting uploading document reference
    let file = admin_document_upload_input.files[0]

    // Storing file with file name in the Database
    docRef = storageRef.child(file.name)
    let metaData = {
        name: file.name,
        test: 'test meta data'
    }
    // Uploaidng file to the database
    docRef.put(file, metaData).then(function(snapshot) {
    alert(' Document uploaded successfully !!! ')
    })
    setTimeout(showAllData(), 3000)
}

// Display All Uploaded files on the screen
showAllData = () => {

    let admin_doc_table_body = document.getElementsByClassName('admin_doc_table_body')[0]
    storageRef.listAll().then(function(result) {
        result.items.forEach(function(data) {

            let download_tr = document.createElement('tr')

            let uploadedList = document.querySelectorAll('.uploaded_document_list')
            for(let upList of uploadedList) {
                upList.remove()
            }

            data.getDownloadURL().then(function(url) {

                // Function to show All Data
                data.getMetadata().then(function (metadata) {
                    
                    // Creating document download link
                    download_tr.classList.add('uploaded_document_list')
                    let admin_doc_table_body_tr_download_link = document.createElement('td')
                    let a = document.createElement('a')
                    a.innerText = data.name
                    a.setAttribute('href', url)
                    a.setAttribute('target', '_blank')
                    admin_doc_table_body_tr_download_link.appendChild(a)
                    download_tr.appendChild(admin_doc_table_body_tr_download_link)
                    admin_doc_table_body.appendChild(download_tr)

                    // Creating Document Upload Details
                    let admin_doc_table_body_tr_doc_uploadTime = document.createElement('td')
                    let createTime = metadata.timeCreated
                    let newTime = createTime.substr(0,10)
                    admin_doc_table_body_tr_doc_uploadTime.innerText = newTime
                    download_tr.appendChild(admin_doc_table_body_tr_doc_uploadTime)

                    // Creating action link to delete
                    let admin_doc_table_body_tr_delete = document.createElement('td')
                    let td_delete_icon = document.createElement('img')
                    td_delete_icon.setAttribute('src', './assets/delete.svg')
                    td_delete_icon.classList.add('admin_action_delete')
                    admin_doc_table_body_tr_delete.appendChild(td_delete_icon)
                    download_tr.appendChild(admin_doc_table_body_tr_delete)

                    // Appending table to Table Row
                    admin_doc_table_body.appendChild(download_tr)

                })
                
            })
        })
    })
}

showAllData()
