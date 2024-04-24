const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
require('dotenv').config();
const { dbConnection } = require('./DB/connectDB');
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
const usuariosRouter = require('./routes/usuarios');
//const configCanchas = require('models/configCanchas');


app.use(bodyParser.json()); // Configura body-parser para analizar JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', usuariosRouter);

const server = http.createServer(app);

dbConnection();
app.post('/verifyToken', (req, res) => {
    const { token } = req.body;
    //console.log('app.post(/verifyToken',req.body);
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        //console.log('Token verificado:', decoded);
        //return res.status(200);
        return res.status(200).json({ verified: true });
    } catch (error) {
        //console.error('Error al verificar el JWT:', error.message);
        //return null;
        return res.status(400).json({ error: 'Token verification failed' });
    }
});

app.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/login/login.html'));
    res.sendFile(path.join(__dirname, 'views/login/login.html'));

});
app.get('/cancha', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/login/login.html'));
    res.sendFile(path.join(__dirname, 'views/cancha.html'));

});
app.get('/home', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/index.html'));
    res.sendFile(path.join(__dirname, 'views/index.html'));

});
app.get('/alineaciones', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/alineaciones.html'));
    res.sendFile(path.join(__dirname, 'views/alineaciones.html'));

});
app.get('/alineacionEquipo', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/quick.html'));
    res.sendFile(path.join(__dirname, 'views/quick.html'));

});
app.get('/partido', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/portada.html'));
    res.sendFile(path.join(__dirname, 'views/portada.html'));

});
app.get('/nuevoUsuario', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/crearUsuario/crearUsuario.html'));
    res.sendFile(path.join(__dirname, 'views/crearUsuario/crearUsuario.html'));

});
app.get('/nuevoUsuarioEquipo', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/crearUsuarioEquipo/crearUsuarioEquipo.html'));
    res.sendFile(path.join(__dirname, 'views/crearUsuarioEquipo/crearUsuarioEquipo.html'));

});
app.get('/nuevoUsuarioCancha', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/views/crearCancha/crearCancha.html'));
    res.sendFile(path.join(__dirname, 'views/crearCancha/crearCancha.html'));

});

/*router.get('/consulta', async (req, res) => {
    try {
        const equipos = await Equipo.find({}, '_id');
        const canchas = await Cancha.find({}, '_id');
        const arbitros = await Arbitros.find({}, '_id');
        const datos = {
            Equipos: equipos.map(equipo => equipo._id),
            Canchas: canchas.map(cancha => cancha._id),
            Arbitros: arbitros.map(arbitro => arbitro._id)
        };

        // Enviar la respuesta al cliente
        res.json(datos);
    } catch (error) {
        console.error(error);
        // Enviar un error al cliente si hay algún problema con la consulta
        res.status(500).json({ error: 'Error al consultar la base de datos.' });
    }
});
*/
server.listen(port, () => {
    console.log(`La aplicación está corriendo en el puerto ${port}.`);
});

/*
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
*/

/*//Modelos
const Canchas = require('./models/Canchas');
const Equipos = require('./models/Equipos');
const Partidos = require('./models/Partidos');
const Roles = require('./models/Roles');
const UsuariosFutbol = require('./models/UsuariosFutbol');*/

/*

app.get('/api/data', async (req, res) => {
    try {
        const data = await UsuariosFutbol.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to handle POST request
app.post('/api/data', async (req, res) => {
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
});

//Conectar a la base de datos en MongoDB/Atlas
/*async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }
}
connect();*/