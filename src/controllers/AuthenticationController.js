const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


// Creating a validation object
const schema = Joi.object({
    user_email: Joi.string().email(),
    user_password: Joi.string().min(8)
});

module.exports = {
    /**
     * Create a new user on authentication database. This method also checks
     * if this user is already registered.
     * @param {*} request 
     * @param {*} response 
     */
    async store(request, response) {
        // Validating the data sent by client
        // const { error } = Joi.validate(request.body, schema);
        // const { error } = schema.validate(request.body); 

        // if (error) {
        //     return response
        //         .status(400)
        //         .json({message: error.details[0].message});
        // }

        const { user_email, user_password } = request.body;
        
        // Checking if client sent request parameters correctly
        if (!(user_email || user_password))
            return response.status(400).json({
                message: 'User password or user email is missing'
            });

        // Checks if user is already registered in database
        let user = await User.findOne({
            user_email
        });

        if (!user) {
            // Generating a salt
            const salt = await bcrypt.genSalt(10);

            // Hashing the password
            const password_hash = await bcrypt.hash(user_password, salt);

            user = await User.create({
                user_email,
                password_hash
            });
        }

        return response.json(user);
    },

    /**
     * Request a authentication token from server given an user email or
     * password.
     * @param {*} request 
     * @param {*} response 
     */
    async login(request, response) {
        const { user_email, user_password } = request.body;

        if (!(user_email || user_password)) {
            return response.status(400).json({
                message: 'User password or email is required'
            });
        }

        // Check if user email already exists on database
        const user = await User.findOne({
            user_email
        });

        if (!user) {
            return response.status(400).json({
                message: 'User email or password may be incorrect!'
            });
        }

        // Check if password is correct (remember, any of bcrypt's functions)
        // are asynchronous.
        // const salt = bcrypt.genSalt(10);
        const isValid = await bcrypt.compare(user_password, user.password_hash);

        console.log('Password hash:', user.password_hash);
        console.log('User password:', user_password);
        console.log('Is valid:', isValid);

        if (!isValid) {
            return response.status(400).json({
                message: 'User email or password may be incorrect!!'
            });
        }

        // Sign authentication token with secret and add user id to it.
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        
        // Adding authentication token on the header of our response
        // response.header('auth-token', token);

        // return response.json({message: 'login'});
        // return response.head('auth-token', token).json({message: 'logged in'});
        return response.append('auth-token', token).send(token);
    },

    async check(request, response) {
        const token = request.get('auth-token');

        if (!token) {
            return response.status(401)
                .json({
                    valid: false,
                    message: 'No token provided'
                });
        }

        try {
            let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            let user = User.findOne({ 
                _id: decoded._id
             });

             if (user) {
                 return response.json({
                     valid: true,
                     message: 'Authorized'
                 });
             }
             else {
                 return response.json({
                     valid: false,
                     message: 'Unauthorized'
                 });
             }
        }
        catch (error) {
            console.log('Erro:', error);
        }

        return response.status(404).json({
            valid: false,
            message: 'Invalid token'
        });
    }
};
