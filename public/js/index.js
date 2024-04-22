console.log("TESTING")
const userData = localStorage.getItem('userData');
//const userData2 = JSON.parse(localStorage.getItem('userData'));
const userData2 = JSON.parse(userData);
const token = localStorage.getItem('token');
console.log(userData); // This will log [object Object]
//console.log(userData2); // This will log the object
//console.log(JSON.stringify(userData)); // This will log the string representation of the object


// Retrieve the token from local storage
/*const token = localStorage.getItem('token');

// Check if the token exists
if (token) {
    // Token exists, you can use it for authentication or other purposes
    document.querySelector('#cerrarSesion').classList.remove('d-none');
} else {
    // Token does not exist or has expired, handle accordingly (e.g., redirect to login page)
    // Redirect to the login page
    document.querySelector('#login').classList.remove('d-none');
    document.querySelector('#nuevoUsuario').classList.remove('d-none');
}
*/

/*import { verify } from 'jsonwebtoken';

// Your JWT secret or public key
const secretOrPublicKey = process.env.PRIVATE_KEY;

// Token retrieved from local storage
const token = localStorage.getItem('token');

try {
    // Verify the token's signature and decode its payload
    const decodedToken = verify(token, secretOrPublicKey);

    // Check if the token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp < currentTimestamp) {
        console.log('Token has expired');
        document.querySelector('#login').classList.remove('d-none');
        document.querySelector('#nuevoUsuario').classList.remove('d-none');
    } else {
        console.log('Token is valid');
        // Token is valid, you can use the decodedToken payload for further processing
        //console.log('Decoded Token:', decodedToken);
        document.querySelector('#cerrarSesion').classList.remove('d-none');
    }
} catch (error) {
    console.error('Error verifying token:', error.message);
    // Handle invalid token or signature verification failure
}*/
document.getElementById('cerrarSesion').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = '/home';
});
/*document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#cerrarSesion').classList.remove('d-none');
    document.querySelector('#usuario').classList.remove('d-none');
    document.getElementById("nombreUsuario").textContent= userData2.username;
});*/
                
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
        document.querySelector('#login').classList.remove('d-none');
        document.querySelector('#nuevoUsuario').classList.remove('d-none');
    }

});

