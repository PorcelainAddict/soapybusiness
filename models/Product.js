import mongoose from 'mongoose';
import shortid from 'shortid';

//deconstructed from mongoose
const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        //throws error if nothing has been entered
        //will throw out if not provided
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        default: shortid.generate()
    },
    description: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    }
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);