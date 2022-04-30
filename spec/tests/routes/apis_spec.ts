import request from 'supertest';
import dbClient from '../../../src/config/database';
import { User } from '../../../src/models/user';
import app from '../../../src/server';



describe('API ROUTING TESTING', () => {
    describe('API Route', () => {
        it('GET /api', async () => {
            await request(app).get('/api').expect(200).expect('Content-Type', /json/);

        });
        let token: string;
        let user: User = {
            email: 'alionour22@gmail.com',
            firstname: 'Ali',
            lastname: 'Nour',
            password: '123'
        }
        let user2: User;
        describe('Authentication Route', () => {
            it('POST /signup', async () => {
                const res = await request(app).post('/signup').send({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password
                }).expect(201).expect('Content-Type', /json/);
                token = res.body

            });

            it('POST /login', async () => {
                await request(app).post('/login').send({
                    email: user.email,
                    password: user.password
                }).expect(200).expect('Content-Type', /json/);
            });


        });

        describe('API ROUTES THAT REQUIRE TOKEN', () => {
            beforeAll(async () => {
                try {
                    const sql = 'SELECT * FROM users WHERE email=($1)';

                    const conn = await dbClient.connect();

                    const result = await conn.query(sql, [user.email]);

                    conn.release();

                    user = result.rows[0];
                    console.log(`id ${user.id}`);

                } catch (err) {
                    throw new Error(`Could not find user ${user.email}. Error: ${err}`);
                }
            });

            describe('Users Route', () => {

                it('GET /api/users', async () => {
                    await request(app).get('/api/users').set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it('POST /api/users', async () => {
                    const res = await request(app).post('/api/users').send({
                        email: 'alionour33@gmail.com',
                        firstname: 'Ali',
                        lastname: 'Nour',
                        password: '123'

                    }).set('Authorization', `Bearer ${token!}`).expect(201).expect('Content-Type', /json/);
                    user2 = res.body;

                });

                it('Show /api/users', async () => {

                    await request(app).get(`/api/users/${user2.id}`).set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it('DELETE /api/users', async () => {
                    await request(app).delete('/api/users').send({
                        id: user2.id,
                    }).set('Authorization', `Bearer ${token!}`).expect(200);
                });
            });

            describe('Categories Route', () => {
                it('GET /api/categories', async () => {
                    await request(app).get('/api/categories/').expect(200).expect('Content-Type', /json/);
                });

                it('POST /api/categories', async () => {
                    await request(app).post('/api/categories').send({
                        category: 'category 1',
                    }).expect(201).expect('Content-Type', /json/);
                });

                it('Show /api/categories', async () => {
                    await request(app).get('/api/categories/1').send({
                        category: 'category 1',
                    }).expect(200).expect('Content-Type', /json/);
                });

                it('DELETE /api/categories', async () => {
                    await request(app).delete('/api/categories').send({
                        id: 1,
                    }).expect(200);
                });
            });

            describe('Products Route', () => {


                it('GET /api/products', () => {
                    request(app).get('/api/products/').expect(200).expect('Content-Type', /json/);
                });

                it('POST /api/products', async () => {
                    await request(app).post('/api/products').send({
                        name: 'product 1',
                    }).set('Authorization', `Bearer ${token!}`).expect(201).expect('Content-Type', /json/);
                });

                it('Show /api/products', async () => {
                    await request(app).get('/api/products/1').send({
                        name: 'product 1',
                    }).expect(200).expect('Content-Type', /json/);
                });

                it('Show Top Products /api/products/top/5', async () => {
                    await request(app).get('/api/products/top/5').expect(200).expect('Content-Type', /json/);
                });

                it('Show Products By Category /api/products/category/1', async () => {
                    await request(app).get('/api/products/category/1').expect(200).expect('Content-Type', /json/);
                });

                it('DELETE /api/products', async () => {
                    await request(app).delete('/api/products').send({
                        id: 1,
                    }).set('Authorization', `Bearer ${token!}`).expect(200);
                });
            });

            describe('Orders Route', () => {


                it('GET /api/orders', () => {
                    request(app).get('/api/orders/').set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it('POST /api/orders', async () => {
                    await request(app).post('/api/orders').send({
                        name: 'product 1',
                    }).set('Authorization', `Bearer ${token!}`).expect(201).expect('Content-Type', /json/);
                });

                it(`GET /api/orders/user/${user.id}`, async () => {
                    await request(app).get(`/api/orders/user/${user.id}`).set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it(`GET /api/orders/active/user/${user.id}`, async () => {
                    await request(app).get(`/api/orders/user/active/${user.id}`).set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it(`GET /api/orders/complete/user/${user.id}`, async () => {
                    await request(app).get(`/api/orders/user/complete/${user.id}`).set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });

                it('Show /api/orders', async () => {
                    await request(app).get('/api/orders/1').set('Authorization', `Bearer ${token!}`).expect(200).expect('Content-Type', /json/);
                });


                it('DELETE /api/orders', async () => {
                    await request(app).delete('/api/orders').send({
                        id: 1,
                    }).set('Authorization', `Bearer ${token!}`).expect(200);
                });
            });

        });


    });




});
