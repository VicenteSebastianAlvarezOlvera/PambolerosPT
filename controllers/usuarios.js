const { response, request } = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const UsuariosFutbol = require('../models/UsuariosFutbol');
const Canchas = require('../models/Canchas');
const saltRounds = 10;
const path = require('path');

function encriptarContrasena(contrasena) {
    return bcrypt.hashSync(contrasena, saltRounds);
}

const getUsuario = async (req, res) => {
    const { correo, contrasena } = req.body; // Asegúrate de que estás accediendo al campo correcto para la contraseña
    console.log(correo, contrasena);
    try {
        const UsuarioSesion = await UsuariosFutbol.findOne({ correo: correo });

        if (!UsuarioSesion) {
            // Si el usuario no existe, redirige o envía un mensaje de error
            return res.redirect('/HalfSuccess'); // O envía un mensaje de error de alguna manera
        }
        console.log("En efecto, hay sesion");
        console.log((bcrypt.compareSync(contrasena, UsuarioSesion.contrasena)));
        // Si el usuario existe, verifica la contraseña
        if (bcrypt.compareSync(contrasena, UsuarioSesion.contrasena)) {
            // Si la contraseña es correcta, redirige a la página de éxito
            return res.status(200).json({ success: 'Login successful' });
        } else {
            // Si la contraseña es incorrecta, redirige o envía un mensaje de error
            return res.redirect('/HalfHalfSuccess'); // O envía un mensaje de error de alguna manera
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al autenticar el usuario.' });
    }
}


/*const getUsuario = async (req, res) => {

    const usuario = req.body;
    console.log(usuario);
    console.log(req.body);
    const { correo, contrasena } = usuario;
    console.log(correo, contrasena );
    try {
        const UsuarioSesion = await UsuariosFutbol.findOne({  correo: correo });
        if (UsuarioSesion && bcrypt.compareSync(contrasena, UsuarioSesion.password)) {
            //const customJWT = await generarJWT(UsuarioSesion._id);
            //const nombreUsuario = UsuarioSesion.nombre;
            res.redirect('/Success');
        } else {
            return res.redirect('/HalfSuccess');
        }}
          catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al guardar la configuración.' });
      }
}*/
/*
app.post('/login', async (req, res) => {
    const usuario = req.body;
    const { uname, psw } = usuario;
    try {
        const UsuarioSesion = await Usuario.findOne({  correo: uname });
        if (UsuarioSesion && bcrypt.compareSync(psw, UsuarioSesion.password)) {
            const customJWT = await generarJWT(UsuarioSesion._id);
            const nombreUsuario = UsuarioSesion.nombre;
            res.redirect(`http://localhost:1000/index?token=${customJWT}&nombre=${nombreUsuario}`);
        } else {
            return res.render('login', { error: 'Datos incorrectos', success: false });
        }}
          catch (error) {
          console.error(error);
      }
});
*/


const postUsuario = async (req, res) => {
    const usuario = req.body;
    //const { username, email, password } = usuario;
    const { nombre, correo, contrasena } = req.body;
    /*
    if (!isValidEmail(email)) {
        return res.render('newUser', { error: 'Correo electrónico no válido', success: false });
    }

    if (psw !== psw2) {
        return res.render('newUser', { error: 'Las contraseñas no coinciden', success: false });
    }*/
    const contrasenaEncriptada = encriptarContrasena(contrasena);
    const newUser = new UsuariosFutbol({
        nombre: nombre,
        correo: correo,
        contrasena: contrasenaEncriptada
    })
    try {
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }
    /*
    try {
        // Create a new instance of your model with data from the request body
        const newUser = new UsuariosFutbol(req.body);
        // Save the new user to the database
        await newUser.save();
        // Respond with the saved user data
        res.status(201).json(newUser);
    } catch (error) {
        // If there's an error, respond with an error message
        res.status(400).json({ message: error.message });
    }*/
}

const postUsuarioCancha = async (req, res) => {
    const { nombre, correo, contrasena, nombreCancha, direccion, tipoCancha } = req.body;
    //const contrasenaEncriptada = encriptarContrasena(psw);
    try {
        // Guardar el nuevo usuario
        const newUser = new UsuariosFutbol({
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        });
        const savedUser = await newUser.save(); // Guardar el nuevo usuario y obtener el objeto guardado
        const propietarioId = savedUser._id; // Obtener el ID del nuevo usuario
        // Guardar la nueva cancha
        const newCancha = new Canchas({
            nombre: nombreCancha,
            direccion: direccion,
            Propietario: propietarioId, // Usar el ID del propietario
            TipoDeCancha: tipoCancha
        });
        await newCancha.save(); // Guardar la nueva cancha
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }

    /*const newUser = new UsuariosFutbol({
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
    })
    try {
        await newUser.save(); // Guardar el nuevo usuario y obtener el objeto guardado
        //res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }

    const newCancha = new Canchas ({
        nombre : nombreCancha,
        direccion : direccion,
        propietario: newUser._id,
        TipoDeCancha: tipoCancha
    })
    try {
        await newCancha.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }*/
}

module.exports = {
    getUsuario,
    postUsuario,
    postUsuarioCancha//,
    //postUsuarioEquipo
}