import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    Name: { type: String },
    userName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    address: { type: String },
    town: { type: String },
    Region: { type: String },
    country: { type: String },
    postalCode: { type: String },
    taxNumber: { type: String },
    NotificationEmail: { type: Boolean, default: false },
    UpdatedEmail: { type: Boolean, default: false },
    PendingOrderEmail: { type: Boolean, default: false },
    OOSEmail: { type: Boolean, default: false },
    AccountOpen: { type: Boolean, default: true }
})

const User = mongoose.model('User', UserSchema);
export default User