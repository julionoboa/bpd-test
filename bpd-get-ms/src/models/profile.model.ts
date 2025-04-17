import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  cellphone: String,
  email: String,
  address: String,
});

export default mongoose.model('Profile', profileSchema);