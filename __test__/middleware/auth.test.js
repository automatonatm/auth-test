/*
*@jest-environment node
* */

import User from '@models/User'

import mongoose from 'mongoose'



import jwt from 'jsonwebtoken'

import config from '@config'



jest.setTimeout(30000)


describe('The auth middleware model ', () => {

    const user =  {
        name: 'test user',
        email: 'testuser@mail.com',
        password: 'password'
    };

    let createdUser;

    beforeAll(async  () => {
        const conn = await mongoose.connect('mongodb://localhost:27017/auth-auth_test', {
            useNewUrlParser:  true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        createdUser = await User.create(user)
    })


    it('should call next function if login successful', () => {})



    afterAll(async () => {
        await mongoose.connection.close()
    })

});