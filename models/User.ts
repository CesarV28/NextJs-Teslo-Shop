import mongoose, { Schema, model, Model } from 'mongoose';

import { IUser } from '@/interfaces';



const userShema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true  },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} no es un rol permitido',
            default: 'client',
            required: true
        },
    },
},{
    timestamps: true,
});


const User: Model<IUser> = mongoose.models.User || model('User', userShema);

export default User;