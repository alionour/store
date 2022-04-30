import supertest from 'supertest';
import app from '../../src/server';
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
it('Server is running fine', (done) => {
    supertest(app).get('/').expect(200).expect('Content-Type', /json/)
        .end(function (err, _res) {
            if (err) throw err;
            done();
        });
});
