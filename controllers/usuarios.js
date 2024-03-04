const { response, request } = require('express');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const UsuariosFutbol = require('../models/UsuariosFutbol');
const Canchas = require('../models/Canchas');

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