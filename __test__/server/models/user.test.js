/*
*@jest-environment node
* */

import User from '@models/User'

import Bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import config from '@config'

import  {connect , disconnect} from  '@test/utils/mongoose'






describe('The user model', () => {

    const user =  {
        name: 'test user',
        email: 'testuser@mail.com',
        password: 'password'
    };

    let createdUser;

    beforeAll(async  () => {

        await  connect()
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
        await disconnect()
    })

});