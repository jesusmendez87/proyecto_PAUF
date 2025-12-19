import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Usuario from './src/app/core/models/user.js';
import Partido from './src/app/core/models/partidos.js';
import Equipo from './src/app/core/models/equipos.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('¡¡¡Conectado a MongoDB!!!'))
  .catch((err) => console.log('Error al conectarse a MongoDB :(', err));

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  //busca en la coleccion de usuarios a través de Usuario
  const user = await Usuario.findOne({ username, password });
  if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });
// creamos un tocken de registro para la sesisón
  const token = jwt.sign({ _id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ user: { _id: user._id, name: user.name, rol: user.rol }, token });
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { username, password, name, rol } = req.body;
  console.log('Registro recibido:', { username, name, rol });

  try {
    // Verificar que el usuario no exista
    const existing = await Usuario.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario (sin hash de password por simplicidad)
    const newUser = new Usuario({ username, password, name, rol });
    await newUser.save();

    console.log('Usuario registrado:', username);
    res.json({ message: 'Registro exitoso', user: { username,password, name, rol } });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ver partidos

import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.rol };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

import { authMiddleware } from './src/app/middlewares/auth.middleware.js';

app.get('/api/partidos', authMiddleware, async (req, res) => {  //utilizamos authMiddleware para validazión de tocken
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const rol = req.user.rol; // Aquí guarda el rol
    // ADMIN: ve tods los partidos
    if (rol === 'admin') {
      const partidos = await Partido.find();
      return res.json(partidos);
    }

    // ARBITRO: solo donde arbitra
    if (rol === 'arbitro') {
      const partidos = await Partido.find({ arbitro_id: userId });
      return res.json(partidos);
    }

    // JUGADOR: equipos donde pertenece
    const partidos = await Partido.aggregate([
      {
        $lookup: {
          from: 'equipos',
          localField: 'local_id',
          foreignField: '_id',
          as: 'local',
        },
      },
      {
        $lookup: {
          from: 'equipos',
          localField: 'visitante_id',
          foreignField: '_id',
          as: 'visitante',
        },
      },
      {
        $match: {
          $or: [{ 'local.players.user_id': userId }, { 'visitante.players.user_id': userId }],
        },
      },
      { $project: { local: 0, visitante: 0 } },
    ]);

    return res.json(partidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener partidos' });
  }
});

// crear un partido
app.post('/api/partido', async (req, res) => {
  const { local_id, visitante_id, arbitro_id, lugar, fecha, deporte } = req.body;
  try {
    const nuevoPartido = new Partido({
      local_id,
      visitante_id,
      arbitro_id,
      lugar,
      fecha,
      deporte,
    });

    await nuevoPartido.save();

    res.status(201).json({ message: 'Partido creado correctamente', partido: nuevoPartido });
  } catch (error) {
    console.error('Error al crear el partido:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ver equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    console.error('Error al obtener los equipos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ver usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const { rol } = req.query;

    let filtro = {};
    if (rol) filtro.rol = rol;

    const usuarios = await Usuario.find(filtro).select('_id name rol'); //  SOLO devuelve id y name

    res.json(usuarios);
  } catch (error) {
    console.error('Error listando usuarios:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }


// elimina usuario, partidos y equipos
app.delete("/api/delete/:type/:id", async (req, res) =>  {  
 const { type, id } = req.params;

  try {
    let result;

    switch (type) {
      case "usuarios":
        result = await Usuario.findByIdAndDelete(id);
        break;

      case "partidos":
        result = await Partido.findByIdAndDelete(id);
        break;

      case "equipos":
        result = await Equipo.findByIdAndDelete(id);
        break;

      default:
        return res.status(400).json({ message: "Tipo no válido" });
    }

    if (!result) {
      return res.status(404).json({ message: "Elemento no encontrado" });
    }

    res.json({
      message: `${type.slice(0, -1)} eliminado correctamente`,
      id
    });

  } catch (error) {
    console.error("Error eliminando:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});



});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
