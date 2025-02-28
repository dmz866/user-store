import mongoose, { Schema } from 'mongoose';
import { CATEGORY_MODEL, PRODUCT_MODEL } from '../../constants';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: CATEGORY_MODEL,
        required: true
    }
});

export const ProductModel = mongoose.model(PRODUCT_MODEL, productSchema);