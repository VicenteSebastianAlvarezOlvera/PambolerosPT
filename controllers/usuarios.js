const { response, request } = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const UsuariosFutbol = require('../models/UsuariosFutbol');
const Canchas = require('../models/Canchas');
const Roles = require('../models/Roles');
const configCanchas = require('../models/configCanchas');
const Equipos = require('../models/Equipos');

const saltRounds = 10;
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        //console.log("En efecto, hay sesion");
        //console.log((bcrypt.compareSync(contrasena, UsuarioSesion.contrasena)));
        // Si el usuario existe, verifica la contraseña
        if (bcrypt.compareSync(contrasena, UsuarioSesion.contrasena)) {
            const token = jwt.sign({ correo: correo }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            const userData = {
                id: UsuarioSesion._id,
                username: UsuarioSesion.nombre,
                rol: UsuarioSesion.rol
                // Other user data...
            };
            console.log("Controller/usuarios.js: ", userData, token);
            // Si la contraseña es correcta, redirige a la página de éxito
            //return res.status(200).json({ success: 'Login successful' });
            return res.status(200).json({ token: token, userData: userData });
            //req.session.userData = userData, token;
            //res.redirect('/home');

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

const agregarIntegrante = async (req, res) => {
    console.log('req.body agregarIntegrante', req.body);
    const { id, emailJugador, numJugador } = req.body;
    console.log('correo', emailJugador);
    try {
        // Find all Canchas documents based on the provided id
        const Equipo = await Equipos.findOne({ Capitan: id });
        console.log('Equipo', Equipo);
        let JugadorAgregar = await UsuariosFutbol.findOne({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } });
        //let JugadorAgregar = await UsuariosFutbol.find({ correo: correo });
        console.log('JugadorBuscado', JugadorAgregar);
        await UsuariosFutbol.updateOne({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } }, { $set: { equipo: Equipo._id } });
        await UsuariosFutbol.updateOne({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } }, { $set: { numero: numJugador } });
        JugadorAgregar = await UsuariosFutbol.find({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } });
        console.log('JugadorAgregar', JugadorAgregar);
        res.status(200).json({ success: 'Jugador agregado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(200).json({ msg: 'Error CATCH searching for Canchas documents.' });
    }
}

const eliminarIntegrante = async (req, res) => {
    console.log('req.body agregarIntegrante', req.body);
    const { id, emailJugador } = req.body;
    console.log('correo', emailJugador);
    try {
        // Find all Canchas documents based on the provided id
        const Equipo = await Equipos.findOne({ Capitan: id });
        console.log('Equipo', Equipo);
        let JugadorAgregar = await UsuariosFutbol.findOne({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } });
        //let JugadorAgregar = await UsuariosFutbol.find({ correo: correo });
        console.log('JugadorBuscado', JugadorAgregar);
        await UsuariosFutbol.updateOne({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } }, { $set: { equipo: null } });
        JugadorAgregar = await UsuariosFutbol.find({ correo: { $regex: `^${emailJugador}$`, $options: 'i' } });
        console.log('JugadorAgregar', JugadorAgregar);
        res.status(200).json({ success: 'Jugador agregado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(200).json({ msg: 'Error CATCH searching for Canchas documents.' });
    }
}

const getEquipos = async (req, res) => {
    /*try {
        const equipos = await Equipos.find();
        res.status(200).json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los equipos.' });
    }*/
    console.log(req.body);
    const { id } = req.body;
    try {
        // Find all Canchas documents based on the provided id
        const Equipo = await Equipos.findOne({ Capitan: id });
        console.log('Equipo', Equipo);
        const JugadoresEquipo = await UsuariosFutbol.find({ equipo: Equipo._id });
        console.log('JugadoresEquipo', JugadoresEquipo);
        // Process the array of canchas documents
        /*if (canchas.length === 0) {
            console.log("No canchas found for the provided Propietario ID");
        } else {
            canchas.forEach(cancha => {
                console.log("Cancha ID:", cancha._id);
                // Process each cancha document as needed
            });
        }*/
        // Respond with the array of canchas documents or an appropriate message
        if (!JugadoresEquipo) {
            res.status(200).json({ msg: 'Error searching for Canchas documents.' });
        }
        res.status(200).json({ JugadoresEquipo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for Canchas documents.' });
    }
}

const postUsuario = async (req, res) => {
    const usuario = req.body;
    //const { username, email, password } = usuario;
    const { nombre, correo, contrasena, rol } = req.body;
    console.log('const postUsuario', nombre, correo, contrasena, rol);
    const Rol = await Roles.findOne({ id_rol: rol })
    console.log('rol DB', Rol);
    const guardarRol = Rol._id;
    const contrasenaEncriptada = encriptarContrasena(contrasena);
    const newUser = new UsuariosFutbol({
        nombre: nombre,
        correo: correo,
        contrasena: contrasenaEncriptada,
        rol: guardarRol
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
const postUsuarioEquipo = async (req, res) => {
    //const { username, email, password } = usuario;
    const { nombre, nombreEquipo, correo, contrasena, rol } = req.body;
    console.log('const postUsuario', nombre, correo, contrasena, rol);
    const Rol = await Roles.findOne({ id_rol: rol })
    console.log('rol DB', Rol);
    const guardarRol = Rol._id;
    const contrasenaEncriptada = encriptarContrasena(contrasena);

    try {
        const newUser = new UsuariosFutbol({
            nombre: nombre,
            correo: correo,
            contrasena: contrasenaEncriptada,
            rol: guardarRol
        })
        const savedUser = await newUser.save(); // Guardar el nuevo usuario y obtener el objeto guardado
        console.log('Usuario guardado:', savedUser)
        const propietarioId = savedUser._id; // Obtener el ID del nuevo usuario
        console.log('ID del propietario:', propietarioId);

        const newEquipo = new Equipos({
            nombre: nombreEquipo,
            Capitan: propietarioId, // Usar el ID del propietario
        });
        console.log("Success")
        await newEquipo.save(); // Guardar la nueva cancha
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

// const postConfigCanchas = async (req, res) => {
//     console.log(req.body);
//     const { checkedCheckboxes, id } = req.body;

//     try {
//         const canchas = await Canchas.findOne({ Propietario: id });
//         console.log(canchas._id);
//         const configcanchas = await configCanchas.findOne({ Canchas: canchas._id });
//         if(!configcanchas){
//             const newConfigCanchas = new configCanchas({
//                 Canchas: canchas._id,
//                 status: checkedCheckboxes
//             });
//             await newConfigCanchas.save();
//         }
//         /*canchas.forEach(async (cancha) => {
//             cancha.status = checkedCheckboxes.includes(cancha._id.toString());
//             await cancha.save();
//         });*/
//         res.status(200).json({ success: 'Configuración guardada exitosamente.' });

//     }catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error al guardar la configuración.' });
//     }
// }
const postConfigCanchas = async (req, res) => {
    console.log(req.body);
    const { checkedCheckboxes, id } = req.body;
    try {
        // Find the Canchas document based on the provided id
        const canchas = await Canchas.findOne({ Propietario: id });
        console.log(canchas._id);

        // Find the ConfigCanchas document associated with the Canchas document
        let configcanchasDB = await configCanchas.findOne({ Cancha: canchas._id });

        // If no ConfigCanchas document exists, create a new one
        if (!configcanchasDB) {
            configcanchasDB = new configCanchas({
                Cancha: canchas._id,
                "6-8": false,
                "8-10": false,
                "10-12": false,
                "12-14": false,
                "14-16": false,
                "16-18": false
            });
        }
        // Update the status of each time slot based on the checked checkboxes
        configcanchasDB["6-8"] = checkedCheckboxes.includes('item1');
        configcanchasDB["8-10"] = checkedCheckboxes.includes('item2');
        configcanchasDB["10-12"] = checkedCheckboxes.includes('item3');
        configcanchasDB["12-14"] = checkedCheckboxes.includes('item4');
        configcanchasDB["14-16"] = checkedCheckboxes.includes('item5');
        configcanchasDB["16-18"] = checkedCheckboxes.includes('item6');
        console.log(configcanchasDB);
        // Save the updated ConfigCanchas document
        await configcanchasDB.save();
        res.status(200).json({ success: 'Configuración guardada exitosamente.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }
}

const getConfigCanchas = async (req, res) => {
    console.log('req.body:', req.body);
    const { id } = req.body;
    console.log("ID", id);
    try {
        // Find the Canchas document based on the provided id
        const canchas = await Canchas.findOne({ Propietario: id });
        console.log("Cancha registro", canchas._id);
        // Find the ConfigCanchas document associated with the Canchas document
        let configcanchasDB = await configCanchas.findOne({ Cancha: canchas._id });
        // If no ConfigCanchas document exists, create a new one
        /*if (!configcanchasDB) {
            console.log("Nada todavia");
            res.status(200).json({ message: "Nada todavia" });
        }*/
        if (!configcanchasDB) {
            configcanchasDB = new configCanchas({
                Cancha: canchas._id,
                "6-8": false,
                "8-10": false,
                "10-12": false,
                "12-14": false,
                "14-16": false,
                "16-18": false
            });
        }
        console.log('configcanchasDB', configcanchasDB);
        console.log('canchas', canchas);
        // Save the updated ConfigCanchas document
        //await configcanchasDB.save();
        res.status(200).json({ configcanchasDB, canchas });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la configuración.' });
    }
}



const postUsuarioCancha = async (req, res) => {
    const { nombre, correo, contrasena, nombreCancha, direccion, tipoCancha, rol } = req.body;
    console.log('const postUsuarioCancha', nombre, correo, contrasena, nombreCancha, direccion, tipoCancha, rol);
    const Rol = await Roles.findOne({ id_rol: rol })
    console.log('rol DB', Rol);
    const guardarRol = Rol._id;
    const contrasenaEncriptada = encriptarContrasena(contrasena);
    //const contrasenaEncriptada = encriptarContrasena(psw);
    try {
        // Guardar el nuevo usuario
        const newUser = new UsuariosFutbol({
            nombre: nombre,
            correo: correo,
            contrasena: contrasenaEncriptada,
            rol: guardarRol
        });
        const savedUser = await newUser.save(); // Guardar el nuevo usuario y obtener el objeto guardado
        console.log('Usuario guardado:', savedUser)
        const propietarioId = savedUser._id; // Obtener el ID del nuevo usuario
        console.log('ID del propietario:', propietarioId);
        // Guardar la nueva cancha
        const newCancha = new Canchas({
            nombre: nombreCancha,
            direccion: direccion,
            Propietario: propietarioId, // Usar el ID del propietario
            TipoDeCancha: tipoCancha
        });
        console.log("Success")
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
    postUsuarioCancha,
    postUsuarioEquipo,
    postConfigCanchas,
    getConfigCanchas,
    getEquipos,
    agregarIntegrante,
    eliminarIntegrante
}