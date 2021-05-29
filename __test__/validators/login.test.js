/*
*@jest-environment node
* */



import loginValidator from '@validators/login'

class Response {
    status(status) {
        this.status = status

        return this
    }

    json(data) {
        return data
    }

}


describe('the login validator', () => {
    it('should call next function if login succeeds', async () => {
        const req = {
            body: {
                email: 'test@mail.com',
                password: 'password'
            }
        }

        const res = {}

        const next = jest.fn()

        await loginValidator(req, res, next)

        expect(next).toHaveBeenCalled()

    })

    it('should return a 422 if validation fails', async () => {
        const req = {
            body: {
                password: 'password'
            }
        }



        const next = jest.fn()

        const res = new Response()

        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')

        await loginValidator(req, res, next)

        expect(statusSpy).toHaveBeenCalledWith(422)
        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Validation failed.',
            data: {
                errors: {
                    email: "email is a required field"
                }
            }

        })
    })



})