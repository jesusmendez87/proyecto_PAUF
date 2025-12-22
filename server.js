import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Usuario from './src/app/core/models/user.js';
import Partido from './src/app/core/models/partidos.js';
import Equipo from './src/app/core/models/equipos.js';
import path from "path";
import { fileURLToPath } from "url";
import jwt from 'jsonwebtoken';
import { authMiddleware } from './src/app/middlewares/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Angular build path
const angularDistPath = path.join(__dirname, 'dist', 'my-app', 'browser');
app.use(express.static(angularDistPath));

// Rutas API

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findOne({ username, password });
  if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ user: { _id: user._id, name: user.name, rol: user.rol }, token });
});

// Registro
app.post('/api/register', async (req, res) => {
  const { username, password, name, rol } = req.body;
  try {
    const existing = await Usuario.findOne({ username });
    if (existing) return res.status(409).json({ message: 'El usuario ya existe' });

    const newUser = new Usuario({ username, password, name, rol });
    await newUser.save();
    res.json({ message: 'Registro exitoso', user: { username, name, rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener partidos (con auth)
app.get('/api/partidos', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const rol = req.user.rol;

    if (rol === 'admin') return res.json(await Partido.find());
    if (rol === 'arbitro') return res.json(await Partido.find({ arbitro_id: userId }));

    const partidos = await Partido.aggregate([
      { $lookup: { from: 'equipos', localField: 'local_id', foreignField: '_id', as: 'local' } },
      { $lookup: { from: 'equipos', localField: 'visitante_id', foreignField: '_id', as: 'visitante' } },
      { $match: { $or: [{ 'local.players.user_id': userId }, { 'visitante.players.user_id': userId }] } },
      { $project: { local: 0, visitante: 0 } },
    ]);

    res.json(partidos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener partidos' });
  }
});

// Crear partido
app.post('/api/partido', async (req, res) => {
  try {
    const nuevoPartido = new Partido(req.body);
    await nuevoPartido.save();
    res.status(201).json({ message: 'Partido creado correctamente', partido: nuevoPartido });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener equipos
app.get('/api/equipos', async (req, res) => {
  try {
    res.json(await Equipo.find());
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const filtro = req.query.rol ? { rol: req.query.rol } : {};
    const usuarios = await Usuario.find(filtro).select('_id name rol');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar elementos
app.delete("/api/delete/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  try {
    let result;
    switch (type) {
      case "usuarios": result = await Usuario.findByIdAndDelete(id); break;
      case "partidos": result = await Partido.findByIdAndDelete(id); break;
      case "equipos": result = await Equipo.findByIdAndDelete(id); break;
      default: return res.status(400).json({ message: "Tipo no válido" });
    }
    if (!result) return res.status(404).json({ message: "Elemento no encontrado" });
    res.json({ message: `${type.slice(0,-1)} eliminado correctamente`, id });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Angular catch-all
app.use((req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('¡¡¡Conectado a MongoDB!!!'))
  .catch(err => console.log('Error al conectarse a MongoDB :(', err));

// Arranque servidor
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port} 🚀`));
