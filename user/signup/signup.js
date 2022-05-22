
let nam = document.querySelector('#name')
let alert = document.querySelector('#alert')
let username = document.querySelector('#username')
let password = document.querySelector('#password')
let email = document.querySelector('#email');
let Userdata ;

    let uri = 'http://localhost:300/user'

// create a post request to the db 
   async function create(){
        let datum = {
            name:nam.value,
            password:password.value,
            username:username.value, 
            email:email.value
        }

        // condition of any empty field from the template

                if(nam.value=='' || password.value=='' || username.value=='' || email.value==''){
                    displayInfo('Invalid Credential(s)', 'error')
                    return
                }

            // posting the information (data)
                        await fetch(url,{
                            method:'POST',
                            headers:{
                                "Content-type": "application/json;charset=UTF-8"
                            },
                            body: JSON.stringify(datum)
                        })
                        .then(res => {
                            console.log(res);
                            displayInfo('User created successfully','success')
                        })
                        .catch(()=>{
                            displayInfo('Something went wrong','error')
                        })   
               }

 // get data from db
      async function getData() {
          
                await fetch(uri).then(res=>res.json()).then(data=> {
                    //passing data into function findData
                findData(data)
                })
                .catch(()=>{
                    displayInfo('Server not found','error')
                })
           }
              
           
     

        function findData(data) {
        // using array method find to get an object fom the array that was fetched from db
        
        let Users = data.find((e)=>{
             return   e.email === email.value || e.username === username.value
            })
            // checking if user exist
           if (Users) {
               displayInfo('User not Created','error')
               return
           }
           // if user doesnt exist
            create()
        }

// function to display information
        function displayInfo(params, status) {

        if(status === 'success'){
            alert.innerHTML +=`
            <div class="alert alert-success d-flex align-items-center alert-dismissible fade" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
             <div>
                 ${params}
             </div>
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>
            ` 
          }
          else{
            alert.innerHTML +=`
            <div class="alert alert-danger d-flex align-items-center alert-dismissible fade" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
             <div>
                 ${params}
             </div>
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
             </div>
            ` 
          }
        }
           