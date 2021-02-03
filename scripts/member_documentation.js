let storageRef = firebase.storage().ref('documents')

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
    
                        // Appending table to Table Row
                        admin_doc_table_body.appendChild(download_tr)
    
                    })
                    
                })
            })
        })
    }
    
    showAllData()