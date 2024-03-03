const { response, request } = require('express');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const UsuariosFutbol = require('../models/UsuariosFutbol');
const path = require('path');

const getUsuario = async (req, res) => {
    try {
        const data = await UsuariosFutbol.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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
    //const contrasenaEncriptada = encriptarContrasena(psw);
    const newUser = new UsuariosFutbol({
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
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

module.exports = {
    getUsuario,
    postUsuario
}