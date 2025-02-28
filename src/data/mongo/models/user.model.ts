import mongoose from 'mongoose';
import { USER_MODEL } from '../../constants';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    }
    ,
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }
});

export const UserModel = mongoose.model(USER_MODEL, userSchema);