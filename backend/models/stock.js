import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//shema creation
const stockSchema = new Schema({
    stockId: Number, min:0,
    name: String,
    quantity: Number, min:0
    
});

// Convertir a modelo
const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
