import mongoose, { Schema } from 'mongoose';
import { CATEGORY_MODEL, USER_MODEL } from '../../constants';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    available: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER_MODEL,
        required: true
    }
});

export const CategoryModel = mongoose.model(CATEGORY_MODEL, categorySchema);