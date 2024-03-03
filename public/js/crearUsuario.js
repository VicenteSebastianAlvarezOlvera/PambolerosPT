document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login100-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = this.querySelector('input[name="username"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[name="contrasena"]').value;
        const confirmPassword = this.querySelector('input[name="confirmPass"]').value;
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        // Verificar que las contraseñas sean iguales
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Enviar solicitud POST a la API
        try {
            const response = await fetch('http://localhost:2000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: username,
                    correo: email,
                    contrasena: password
                })
            },
            );
            if (!response.ok) {
                throw new Error('Error al enviar los datos.');
            }
            if (response.ok) {
                alert('Usuario creado exitosamente.');
                res.redirect('/login');
            }
            const data = await response.json();
            alert('Usuario creado exitosamente.');
        } catch (error) {
            throw new Error('Error al enviar los datos.');
        }
    });
});
