import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./src/app/core/models/user.js";
import Partido from "./src/app/core/models/partidos.js";
import Equipo from "./src/app/core/models/equipos.js";   

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
  .catch(err => console.log("Error al conectarse a MongoDB :(", err));

// Ruta de login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    const user = await Usuario.findOne({ username, password });
    console.log("Resultado de búsqueda:", user);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const userSafe = user.toObject ? { ...user.toObject(), password: undefined } : user;
    res.json({ message: "Login exitoso", user: userSafe });
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta de registro
app.post("/api/register", async (req, res) => {
  const { username, password, name, rol } = req.body;
  console.log("Registro recibido:", { username, name,rol });

  try {
    // Verificar que el usuario no exista
    const existing = await Usuario.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Crear nuevo usuario (sin hash de password por simplicidad)
    const newUser = new Usuario({ username, password, name, rol });
    await newUser.save();
    
    console.log("Usuario registrado:", username);
    res.json({ message: "Registro exitoso", user: { username, name, rol } });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
 
});

//ver partidos
app.get("/api/partidos", async (req, res) => {
  try {
    const partidos = await Partido.find();
    res.json(partidos);
  } catch (error) {
    console.error("Error al obtener los partidos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } 
});
// crear un partido
app.post("/api/partido", async (req, res) => {
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

    res.status(201).json({ message: "Partido creado correctamente", partido: nuevoPartido });

  } catch (error) {
    console.error("Error al crear el partido:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

//ver equipos
app.get("/api/equipos", async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } 


//ver usuarios

app.get("/api/usuarios", async (req, res) => {
  try {
    const { rol } = req.query;

    let filtro = {};
    if (rol) filtro.rol = rol;

    const usuarios = await Usuario
      .find(filtro)
      .select("_id name");   // 👈 SOLO devuelve id y name

    res.json(usuarios);

  } catch (error) {
    console.error("Error listando usuarios:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});
app.get("/api/usuarios", async (req, res) => {
  try {
    const { rol } = req.query;

    let filtro = {};
    if (rol) filtro.rol = rol;

    const usuarios = await Usuario
      .find(filtro)
      .select("_id name");   // 👈 SOLO devuelve id y name

    res.json(usuarios);

  } catch (error) {
    console.error("Error listando usuarios:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});


});
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);


 
