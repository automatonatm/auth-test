/*
*@jest-environment node
* */

import User from '@models/User'

import mongoose from 'mongoose'

import Bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import config from '@config'



jest.setTimeout(30000)


describe('The user model', () => {

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


    it('should harsh password before saving to database', async () => {

        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBeTruthy();

    })

    it("should set confirm could before saving to database", async () => {

        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })

    describe('The Generation Method', () => {
        it('should generate a valid jwt for user', async () => {
            const token = createdUser.generateToken()
            const {id} = jwt.verify(token, config.jwtSecret)

            expect(id).toEqual(createdUser._id.toString())
        })
    })


    afterAll(async () => {
        await mongoose.connection.close()
    })

});