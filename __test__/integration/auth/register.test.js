/*
*@jest-environment node
* */


import server from '@server/app'
import supertest from 'supertest'

import  {disconnect} from  '@test/utils/mongoose'
import User from "@models/User";

const app = () => supertest(server)


describe('The register process', () => {

    const REGISTER_ENDPOINT = '/api/v1/auth/register'

    let user = {
        name: 'test User',
        email: 'test2@user.com',
        password: 'password'
    }

    beforeEach(async () => {
        await User.deleteMany({})
    })


    it('should register a new user', async () => {
        //actions
        const response  = await app().post(REGISTER_ENDPOINT).send(user)


        //assertion
        expect(response.status).toBe(200)

        expect(response.body.data.token).toBeDefined()

        expect(response.body.message).toBe('Account registered.')

    })

    it('should return 422 if registration fails',  async () => {

        //preparation
        await User.create(user);


        //action
        const response  = await app().post(REGISTER_ENDPOINT).send(user)


        //assertions
        expect(response.status).toBe(422)

        expect(response.body.message).toBe('Validation failed.')

        expect(response.body.data.errors).toEqual({
            email: 'This email has already been taken.',
        })


    })


    afterAll(async  () => {
        await disconnect()
    })
})

