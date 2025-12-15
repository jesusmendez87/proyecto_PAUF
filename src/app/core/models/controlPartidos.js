const mongoose = require('mongoose');
const Partido = require('../models/Partido');

exports.getFilterPartidos = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const role = req.user.role;

    // 🔴 ADMIN → ve todo
    if (role === 'admin') {
      const partidos = await Partido.find();
      return res.json(partidos);
    }

    // 🟡 ARBITRO → solo donde arbitra
    if (role === 'arbitro') {
      const partidos = await Partido.find({
        arbitro_id: userId
      });
      return res.json(partidos);
    }

    // 🔵 JUGADOR → equipos donde pertenece
    const partidos = await Partido.aggregate([
      {
        $lookup: {
          from: 'equipos',
          localField: 'local_id',
          foreignField: '_id',
          as: 'local'
        }
      },
      {
        $lookup: {
          from: 'equipos',
          localField: 'visitante_id',
          foreignField: '_id',
          as: 'visitante'
        }
      },
      {
        $match: {
          $or: [
            { 'local.players.user_id': userId },
            { 'visitante.players.user_id': userId }
          ]
        }
      },
      {
        $project: {
          local: 0,
          visitante: 0
        }
      }
    ]);

    return res.json(partidos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener partidos' });
  }
};
