console.log("TESTING")
const userData = localStorage.getItem('userData');
const userData2 = JSON.parse(userData);
const token = localStorage.getItem('token');
console.log(userData2);
document.getElementById('cerrarSesion').addEventListener('click', function () {
    localStorage.clear();
    window.location.href = '/home';
});
function showAndHide(rol, nombre) {
    document.querySelector('body').classList.remove('d-none');
    document.querySelector('#cerrarSesion').classList.remove('d-none');
    document.querySelector('#usuario').classList.remove('d-none');
    document.getElementById("nombreUsuario").textContent = nombre;
    if (rol === "65e5585568f4b345aad77ab7") {
        document.querySelector('#botonPartido').classList.remove('d-none');
    } else if (rol === "65e558c068f4b345aad77ab9") {
        document.querySelector('#botonCancha').classList.remove('d-none');
    } else if (rol === "65e5589f68f4b345aad77ab8") {
        document.querySelector('#botonJugadores').classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        if (token) {
            const response = await fetch('/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            console.log(response);
            if (!response.ok) {
                document.querySelector('#login').classList.remove('d-none');
                document.querySelector('#nuevoUsuario').classList.remove('d-none');
                // Token is valid
                //console.log('Token is valid');
/*
                console.log('ROL', userData2.rol)
                if (userData2.rol === "65e5585568f4b345aad77ab7") {
                    document.querySelector('#botonPartido').classList.remove('d-none');
                } else if (userData2.rol === "65e558c068f4b345aad77ab9") {
                    document.querySelector('#botonCancha').classList.remove('d-none');
                } else if (userData2.rol === "65e5589f68f4b345aad77ab8") {
                    document.querySelector('#botonJugadores').classList.remove('d-none');
                }*/
            }
            showAndHide(userData2.rol, userData2.username);
            console.log('userData2.id:', userData2.id);
            const dataResponse = await fetch('/api/GetGetConfigCanchas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData2.id
                })
            });
            if (!dataResponse.ok) {
                console.log('Error al enviar los datos.');
            }
            const data = await dataResponse.json(); // Extract the JSON data from the response
            console.log("Datos de respuesta", data); // Log the extracted data
            /*if(data.message === "Nada todavia"){
                console.log("Nada todavia")
            }*/
            document.querySelector('#direccion').innerHTML = data.canchas.direccion;
            document.querySelector('#nombreCancha').innerHTML = data.canchas.nombre;
            // Assuming data contains the object you provided
            if (data.configcanchasDB["6-8"] === true) {
                document.getElementById("item1").click();
                console.log("6-8")
            }
            if (data.configcanchasDB["8-10"] === true) {
                document.getElementById("item2").click();
                console.log("8-10")
            }
            if (data.configcanchasDB["10-12"] === true) {
                document.getElementById("item3").click();
                console.log("3")
            }
            if (data.configcanchasDB["12-14"] === true) {
                document.getElementById("item4").click();
                console.log("4")
            }
            if (data.configcanchasDB["14-16"] === true) {
                document.getElementById("item5").click();
                console.log("5")
            }
            if (data.configcanchasDB["16-18"] === true) {
                document.getElementById("item6").click();
                console.log("6")
            }

        } else {
            window.location.href = '/home';
        }
    }
    catch (error) {
        window.location.href = '/home';
        //console.error('Error verifying token:', error);
    };
    //  else {
    // 
}

);

//document.addEventListener('DOMContentLoaded', async function () {
const form = document.getElementById('configCanchasForm'); // Replace 'yourFormId' with the actual ID of your form

form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const checkboxes = document.querySelectorAll('.status'); // Select all checkboxes with the class 'status'
    const checkedCheckboxes = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) { // Check if the checkbox is checked
            checkedCheckboxes.push(checkbox.id); // Add the ID of the checked checkbox to the array
        }
    });
    // Do something with the array of checked checkboxes
    console.log('Checked checkboxes:', checkedCheckboxes);
    try {
        const response = await fetch('/api/ConfigCanchas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checkedCheckboxes,
                id: userData2.id
            })
        });
        if (!response.ok) {
            throw new Error('Error al guardar la configuración');
        }
        if (response.ok) {
            alert('Configuración guardada exitosamente.');
            window.location.href = '/cancha';
            //window.location.href = '/home';
        }
        const data = await response.json();
        //alert('Configuración guardada exitosamente.');
    }
    catch (error) {
        alert('Error al guardar la configuración');
    }
});

//});
/*
verifyTokenAndFetchData(token)
    .then(dataResponse => {
        // Handle the fetched data
        console.log(dataResponse);
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });*/
/*
async function verifyTokenAndFetchData(token, id) {
    console.log('async function verifyTokenAndFetchData(token, id) {', token, id);
    //const UID = userData2 ? localStorage.getItem(userData2.id) : null;
    try {
        const response = await fetch('/verifyToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error('Failed to verify token');
        }

        const userDataResponse = await fetch('/api/getConfigCanchas', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        });

        const userData = await userDataResponse.json();

        return userData;
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error appropriately
        throw error; // Re-throw the error to be handled by the caller
    }
}

// Usage
document.addEventListener('DOMContentLoaded', async function () {
    const UID = userData ? localStorage.getItem(userData.id) : null;
    console.log('UID', UID);
    console.log('JOSN', userData2.id);
    //const usuario = userData2.id;
    console.log('usuario', usuario)
    console.log('userData', userData2);
    //const UID = localStorage.getItem(userData2.id);
    try {
        const usuario = userData2.id;
        console.log('try1', userData.id);
        console.log('try2', userData2.id);
        if(usuario){
            console.log('existe usuario', usuario);
        }
        if (token && usuario) {
            console.log('if (token && usuario)');
            const userData = await verifyTokenAndFetchData(token, usuario);
            console.log(userData);
            // Do something with the fetched user data
        } else {
            alert('Token not found');
            //window.location.href = '/home';
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Catch not found');
        //window.location.href = '/home';
        // Handle errors
    }
});
*/