import mongoose from 'mongoose';

const supplyItemSchema = new mongoose.Schema({
  itemname: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  budget: { type: Number, required: true },
  date: { type: String, required: true },
 
   
});

const supply = mongoose.model('supply', supplyItemSchema);

export default supply;