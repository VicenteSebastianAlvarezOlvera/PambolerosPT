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
            console.log('Token: ', response);
            if (!response.ok) {
                document.querySelector('#login').classList.remove('d-none');
                document.querySelector('#nuevoUsuario').classList.remove('d-none');
            }
            showAndHide(userData2.rol, userData2.username);
            ////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////
            console.log("Afeter showAndHide")
            const dataResponse = await fetch('/api/guardarPartidos', {
                method: 'POST'
            });
            if (dataResponse.ok) {
                const data = await dataResponse.json();
                console.log("Datos de respuesta", data);

                data.partidosWithDetails.forEach((partido, index) => {
                    console.log("Partido", index, partido);
                    document.querySelector(`#Partido${index + 1}`).classList.remove('d-none');
                    console.log('Eliminar d-none', partido)
                    ///document.querySelector(`#Partido${index + 1} td:nth-child(2)`).innerText = partido.fecha;
                    const rawDate = new Date(partido.fecha); // Convert the raw date string to a Date object
                    const formattedDate = `${rawDate.toLocaleDateString()} ${rawDate.toLocaleTimeString()}`; // Format the date as desired
                    document.querySelector(`#Partido${index + 1} td:nth-child(2)`).innerText = formattedDate;
                    console.log('Fecha', partido.fecha)
                    document.querySelector(`#Partido${index + 1} td:nth-child(3)`).innerText = partido.Equipo1;
                    console.log('Equipo1', partido.Equipo1)
                    document.querySelector(`#Partido${index + 1} td:nth-child(4)`).innerText = partido.Equipo2;
                    console.log('Equipo2', partido.Equipo2)
                    document.querySelector(`#Partido${index + 1} td:nth-child(5)`).innerText = partido.cancha;
                    console.log('cancha', partido.cancha)
                    // document.querySelector(`#jugador${index + 1} div`).innerHTML = jugador.numero;
                    // document.querySelector(`#jugador${index + 1} p`).innerHTML = jugador.nombre;
                    // document.querySelector(`#jugador${index + 1}`).classList.remove('d-none');
                    // document.querySelector(`#jugador${index + 1}`).classList.remove('d-none');
                    // // Perform some operation for each partidoWithDetails object
                    // console.log(partido);
                    // Your logic here
                });
            } else {
                console.error("Error:", dataResponse.statusText);
            }


            //console.log("Datos de respuesta", data);
            //const jugadoresEquipo = data.JugadoresEquipo;
            // const count = jugadoresEquipo.length;
            // if (!count) {
            //     document.querySelector('#gcambio').classList.add('d-none');
            // }
            // console.log("Count:", count);

            // // Iterate through each object in the array
            // jugadoresEquipo.forEach((jugador, index) => {
            //     console.log("Jugador", jugador);
            //     console.log(`#integrante${index + 1}`)
            //     document.querySelector(`#jugador${index + 1} div`).innerHTML = jugador.numero;
            //     document.querySelector(`#jugador${index + 1} p`).innerHTML = jugador.nombre;
            //     document.querySelector(`#jugador${index + 1}`).classList.remove('d-none');
            // });
            ////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////    
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

