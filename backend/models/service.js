import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//shema creation
const serviceSchema = new Schema({
    projectId: String,
    province: String,
    address: String,
    dateRequired: { type: Date, default: Date.now },
    userId: String,
    //user: {type: Schema.ObjectId, ref: "User"},
    serviceType: String,
    itemName: String,
    quantity: Number, min:0
    
});

// Convertir a modelo
const Service = mongoose.model('Service', serviceSchema);

export default Service;
