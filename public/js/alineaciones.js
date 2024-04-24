document.getElementById('cerrarSesion').addEventListener('click', function () {
    localStorage.clear();
    window.location.href = '/home';
});
console.log("TESTING")
const userData = localStorage.getItem('userData');
//const userData2 = JSON.parse(localStorage.getItem('userData'));
const userData2 = JSON.parse(userData);
const token = localStorage.getItem('token');
console.log(userData);

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
    // Assume 'token' contains the JWT to be verified
    // Make a request to the server to verify the token
    console.log('token', token)
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
            }
            showAndHide(userData2.rol, userData2.username);
            const dataResponse = await fetch('/api/GetEquipos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData2.id
                })
            });
            const data = await dataResponse.json(); // Extract the JSON data from the response

            console.log("Datos de respuesta", data);
            const jugadoresEquipo = data.JugadoresEquipo;
            const count = jugadoresEquipo.length;
            if (!count) {
                document.querySelector('#gcambio').classList.add('d-none');
            }
            console.log("Count:", count);

            // Iterate through each object in the array
            jugadoresEquipo.forEach((jugador, index) => {
                console.log("Jugador", jugador);
                console.log(`#integrante${index + 1}`)
                document.querySelector(`#jugador${index + 1} div`).innerHTML = jugador.numero;
                document.querySelector(`#jugador${index + 1} p`).innerHTML = jugador.nombre;
                document.querySelector(`#jugador${index + 1}`).classList.remove('d-none');
            });
            // const count = data.length;
            // if(count){
            // console.log("Number of objects:", count);
            // }
            // 
            // 
            // Iterate through each object in the array using forEach
            // data.forEach((object, index) => {
            // document.querySelector(`#integrante${index}`).innerHTML = data.nombre;
            // document.querySelector(`#integrante${index}`).classList.remove('d-none');
            // Perform any operations on each object here
            // });
        } else {
            //window.location.href = '/home';
        }
    }
    catch (error) {
        //window.location.href = '/home';
        alert('Error verifying token:', error);
    };
});



document.getElementById('agregarEliminarUsuario').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const emailJugador = this.querySelector('input[name="correoJugador"]').value;
    const opcion = this.querySelector('select[name="AgregarEliminar"]').value;
    const numJugador = this.querySelector('input[name="numJugador"]').value;
    console.log(emailJugador, opcion);
    if (opcion === "¿Que hacer?") {
        alert('Seleccione una opción.');
        return;
    }
    if (emailJugador === "") {
        alert('Ingrese el correo de un jugador.');
        return;
    }
    if (opcion === "1") {
        if(numJugador === "" || !numJugador){
            alert('Agregue un número para el jugador.');
            return;
        }
        try {
            const response = await fetch('/api/agregarIntegrante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailJugador,
                    id: userData2.id,
                    numJugador
                })
            });
            if (!response.ok) {
                console.log('Error al agregar jugador. !response.ok');
            }
            if (response.ok) {
                alert('Jugador agregado exitosamente.');
                window.location.href = '/alineaciones';
            }
            //const data = await response.json();
            //alert('Configuración guardada exitosamente.');
        }
        catch (error) {
            alert('Error al agregar jugador.');
        }
    }
    if (opcion === "2") {
        try {
            const response = await fetch('/api/eliminarIntegrante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailJugador,
                    id: userData2.id
                })
            });
            if (!response.ok) {
                console.log('Error al eliminar jugador. !response.ok');
            }
            if (response.ok) {
                alert('Jugador eliminado exitosamente.');
                window.location.href = '/alineaciones';
            }
            //const data = await response.json();
            //alert('Configuración guardada exitosamente.');
        }
        catch (error) {
            alert('Error al agregar jugador.');
        }
    }
});
// checkboxes.forEach(function (checkbox) {
//     if (checkbox.checked) { // Check if the checkbox is checked
//         checkedCheckboxes.push(checkbox.id); // Add the ID of the checked checkbox to the array
//     }
// });
// // Do something with the array of checked checkboxes
// console.log('Checked checkboxes:', checkedCheckboxes);
// try {
//     const response = await fetch('/api/ConfigCanchas', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             checkedCheckboxes,
//             id: userData2.id
//         })
//     });
//     if (!response.ok) {
//         throw new Error('Error al guardar la configuración');
//     }
//     if (response.ok) {
//         alert('Configuración guardada exitosamente.');
//         window.location.href = '/cancha';
//         //window.location.href = '/home';
//     }
//     const data = await response.json();
//     //alert('Configuración guardada exitosamente.');
// }
// catch (error) {
//     alert('Error al guardar la configuración');
// }
