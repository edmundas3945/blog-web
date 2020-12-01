
const inputUserName = document.getElementById('userName')
const inputPassword = document.getElementById('password')
const inputPassword2 = document.getElementById('password2')
const submit = document.getElementById('submit')



// inputUserName.addEventListener('input', createUserName)
// inputPassword.addEventListener('input', createPassword)
// inputPassword2.addEventListener('input', createPassword2)
// submit.addEventListener('click', registerUser)

// function registerUser(){
//     let data: {
//         username: input
//
//     }
// }

// function createUserName(event){
//     data[0].username = inputUserName.value
// }
// function createPassword(event){
//     data[0].password = event.target.value
// }
// function createPassword2(event){
//     data[0].password2 = event.target.value
// }


function getAll(){
    fetch('http://167.99.138.67:1111/getallposts')
        .then(res => res.json())
        .then(data => console.log(data))
}
getAll()


function registerUser(){
    let data = {
        name: inputUserName.value,
        passwordOne: inputPassword.value,
        passwordTwo: inputPassword2.value
    }

    fetch('http://167.99.138.67:1111/createaccount', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

}