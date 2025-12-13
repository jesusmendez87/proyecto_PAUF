import mongoose from 'mongoose';


const actaSchema = new mongoose.Schema({
    jugador: { type:String},   
    minuto: { type: Number },
    tipo: { 
        type: String, 
        enum: ['gol', 'amarilla', 'roja', 'sustitucion'], 
        
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
        local_score: { type: Number },
        visitante_score: { type: Number}, 
        },

  acta: [actaSchema],
   
  fecha: { type: Date},
  lugar: { type: String }
});

export default mongoose.model('Partido', partidoSchema);