document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login100-form');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[name="pass"]').value;
        
        console.log(email);
        console.log(password);
        // Enviar solicitud GET a la API
        try {
            const response = await fetch('http://localhost:2000/api/getdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: email,
                    contrasena: password
                })
            },
            );
            console.log(response);
            
            if (!response.ok) {
                //throw new Error('Error al enviar los datos.');
                alert('Datos incorrectos.');
                //res.redirect('/login');
                window.location.href = '/login';
            }
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const token = data.token;
                const userData = data.userData;
                localStorage.setItem('token', token); // Store the token in local storage
                localStorage.setItem('userData', JSON.stringify(userData)); // Store the token in local storage
                //localStorage.setItem('userData2', userData);
                console.log(token, userData);
                /*setTimeout(() => {
                    console.log('Han pasado 10 segundos');
                    window.location.href = '/home';
                }, 25000);*/
                window.location.href = '/home';

            }
            const data = await response.json();
            alert('CONST Usuario creado exitosamente.');
        } catch (error) {
            throw new Error('Catch Error al enviar los datos.');
        }
    });
});
