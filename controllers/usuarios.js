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
    }
}

module.exports = {
    getUsuario,
    postUsuario
}