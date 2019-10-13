const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', function() {

    beforeEach(async () => {
        await truncate();
    });


    it('should authenticate with valid credentials', async (done) => {

        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.status).toBe(200);

        done();
    });

    it('should not authenticate with invalid credentials', async (done) => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.status).toBe(401);

        done();
    });

    it('should return jwt token when authenticated', async (done) => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.body).toHaveProperty('token');

        done();
    });

    it('should be able to access private routes when authenticated', async (done) => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);


        expect(response.status).toBe(200);

        done();
    });

    it('should not be able to access private routes whithout jwt token', async (done) => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .get('/dashboard');

        expect(response.status).toBe(401);
        done();
    });

    it('should not be able to access private routes with invalid jwt token', async (done) => {
        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123123`);

        expect(response.status).toBe(401);
        done();
    });

});