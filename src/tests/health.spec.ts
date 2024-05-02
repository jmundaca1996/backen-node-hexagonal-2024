import supertest from 'supertest'
import app from '../app'

describe('root endpoint get and post', () => {
    test('get to / returns 200 and data', async () => {
        const result = await supertest(app).get('/api/v1/health')
        expect(result.statusCode).toEqual(200)
        expect(result.body.api).toBeTruthy()
    })

    test('404 & json returned from nonexistent route', async () => {
        const result = await supertest(app).get('/badPath')
        expect(result.statusCode).toEqual(404)
        expect(result.body.message).toBeTruthy()
    })
})