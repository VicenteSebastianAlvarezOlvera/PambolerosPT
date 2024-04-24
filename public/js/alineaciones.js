document.getElementById('cerrarSesion').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = '/home';
});
console.log("TESTING")
const userData = localStorage.getItem('userData');
//const userData2 = JSON.parse(localStorage.getItem('userData'));
const userData2 = JSON.parse(userData);
const token = localStorage.getItem('token');
console.log(userData);

document.addEventListener('DOMContentLoaded', function () {
    // Assume 'token' contains the JWT to be verified
    // Make a request to the server to verify the token
    if(token){
        fetch('/verifyToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                // Token is valid
                console.log('Token is valid');
                document.querySelector('#cerrarSesion').classList.remove('d-none');
                document.querySelector('#usuario').classList.remove('d-none');
                document.getElementById("nombreUsuario").textContent= userData2.username;
                console.log('ROL', userData2.rol)
                if(userData2.rol === "65e5585568f4b345aad77ab7"){
                    document.querySelector('#botonPartido').classList.remove('d-none');
                }else if(userData2.rol === "65e558c068f4b345aad77ab9"){
                    document.querySelector('#botonCancha').classList.remove('d-none');
                }else if(userData2.rol === "65e5589f68f4b345aad77ab8"){
                    document.querySelector('#botonJugadores').classList.remove('d-none');
                }
            } else {
                // Token is not valid or there was an error
                console.error('Token is not valid');
                document.querySelector('#login').classList.remove('d-none');
                document.querySelector('#nuevoUsuario').classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error verifying token:', error);
        });
    }else{
        window.location.href = '/home';
    }

});

