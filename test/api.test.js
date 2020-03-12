/**
 * Doing some simple tests on API and cheking if it's working correctly. These
 * tests will use chai as a assertion library.
 */
const chai = require('chai');
const supertest = require('supertest');

const app = require('../src/app');


describe('Testing if API is working correctly', function() {
    it.skip('Test if login routes is working', function(done) {
        supertest(app).post('/api/auth/login').expect(200, () => {
            done();
        });
    });

    it.skip('Test if store route is working', function(done) {
        supertest(app).post('/api/auth/store').expect(200, () => {
            done();
        })
    });

    it('Test when user sends a request with empty body', function(done) {
        supertest(app).post('/api/auth/store').expect(400, () => {
            done();
        });
    });
});
