import { db } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import { jwt, validations } from '@/utils';

type Data = 
  | { 
    token: string;
    user:  {
            email: string;
            name: string;
            role: string;
        }
    }   
  | { message?: string; }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':

            return registerUser( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
     
    } 
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    // Get data from request
    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };

    // Validate password is more than 6 characters
    if( password.length < 6 ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    // Validate name is more than 3 characters
    if( name.length < 2 ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Name must be at least 3 characters' });
    }
    // Validate email is valid
    if( !validations.isValidEmail( email ) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Invalid email' });
    }

    await db.connect();

    const user = await User.findOne({ email });
    

    if ( user ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
        email,
        password: bcrypt.hashSync( password, 10 ),
        name,
        role: 'user'
    });

    try {

        await newUser.save({ validateBeforeSave: true });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    
    }

    const {  _id, role } = newUser;

    const token = jwt.singToken( _id, email );
    
    return res.status(200).json({ 
        token,
        user: {
            email,
            name,
            role
        }
    });

}


