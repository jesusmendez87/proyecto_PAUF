import mongoose from 'mongoose';


const actaSchema = new mongoose.Schema({
    jugador: { type:String, required: true },   
    minuto: { type: Number, required: true },
    tipo: { 
        type: String, 
        enum: ['gol', 'amarilla', 'roja', 'sustitucion'], 
        required: true 
    }
});


const partidoSchema = new mongoose.Schema({
  local_id: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Equipo', 
     required: true 
    },  
  visitante_id: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Equipo', 
     required: true 
    },
  arbitro_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuarios', 
    required: true },
   
  resultado: {
        local_score: { type: Number, required: true },
        visitante_score: { type: Number, required: true }, 
        },

  acta: [actaSchema],
   
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true }
});

export default mongoose.model('Partido', partidoSchema, 'partidos');

 

