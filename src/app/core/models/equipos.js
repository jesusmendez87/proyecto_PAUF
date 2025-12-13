import mongoose from 'mongoose';
 

const playersSchema = new mongoose.Schema({
    players: {  type: mongoose.Schema.Types.ObjectId, 
    user_id: 'Usuario',  
    nombre: { type: String, required: true },
    numero: { type: Number, required: true } },   
    posicion: { type: String, required: true },
    
    Estadisticas: {
      type: mongoose.Schema.Types.ObjectId,
       goles: { type: String },
       asistencias : { type: String }
    }
 
    });



const equipoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },  
  name : { type: String, required: true },
  ciy: { type: String, required: true },
  category: { type: String, required: true },
  players: [playersSchema],
  deporte: { type: String, required: true }

});

export default mongoose.model('Equipo', equipoSchema, 'equipos');

