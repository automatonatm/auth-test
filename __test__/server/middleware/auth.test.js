/*
*@jest-environment node
* */

import User from '@models/User'

import mongoose from 'mongoose'

import authMiddleware from  '@middleware/auth'

import Response from '@test/utils/response'

import  {connect , disconnect} from  '@test/utils/mongoose'


describe('The auth middleware model ', () => {

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


    it('should call next function if authenticated', async () => {
        const access_token = createdUser.generateToken()

        const req = {
            body: {
                access_token
            }
        }


        const res = new Response();

        const next = jest.fn()

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled()

    })

    it('should return 401 if auth fails', async () => {
        const req = {
            body: {
                access_token: 'access'
            }
        }


        const res = new Response();

        const next = jest.fn()

        const statusSpy = jest.spyOn(res, 'status');

        const jsonSpy = jest.spyOn(res, 'json');

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(0);

        expect(statusSpy).toHaveBeenCalledWith(401);

        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })

    })


    afterAll(async () => {
        await disconnect()
    })

});