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
                //alert('IF Usuario creado exitosamente.');
                //res.redirect('/login');
                window.location.href = '/home';
            }
            const data = await response.json();
            alert('CONST Usuario creado exitosamente.');
        } catch (error) {
            throw new Error('Catch Error al enviar los datos.');
        }
    });
});
