import express, {Request,  Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@frst-ticket-app/common';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),

        body('password')
            .trim()
            .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 chars')
    ],
    validateRequest,
    async (req: Request, res: Response) => {  
        const { email, password }= req.body;

        // Find or create process
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            throw new BadRequestError('Email already in use');
        }

        const user = User.build({ email, password });   // building the user object
        await user.save();  //  saving to mongo db

        // generate jwt
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            }, 
            process.env.JWT_KEY!    // ! bypasses Ts undefined check
        );


        // store jwt in session
        // we redefine the session object, because the type definition file 
        // does not want to assume there is already an object on req.session
        req.session = {
            jwt: userJwt
        };


        res.status(201).send(user);
});

export {router as signupRouter};