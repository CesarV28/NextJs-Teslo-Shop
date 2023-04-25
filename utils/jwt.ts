import jwt from 'jsonwebtoken';

export const singToken = ( _id: string, email: string ) => {

    if( !process.env.JWT_SECRET_SEED ) {
        throw new Error('JWT seed is not defined');
    }

    return jwt.sign(
        // payload
        {
            _id,
            email
        },
        // seed
        process.env.JWT_SECRET_SEED,
        // options
        {
            expiresIn: '15d'
        }
    );

}

export const isValidToken = ( token: string ): Promise<string> => {
    if( !process.env.JWT_SECRET_SEED ) {
        throw new Error('JWT seed is not defined');
    }

    return new Promise( (resolve, reject) => {
        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', ( err, payload ) => {
                if( err ) {
                    return reject('JWT is not valid');
                } 
    
                const { _id } = payload as { _id: string };
                    
                resolve( _id );
                
            });
        } catch (error) {
            return reject('JWT is not valid');
        }
    });
}