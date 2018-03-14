'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../app.js');

describe('API endpoint account', function () {
    describe('POST /account', function () {
        this.timeout(5000); // How long to wait for a response (ms)
        it('valid create account', function () {
            return chai.request(app)
                .post('/account')
                .type('form')
                .send({
                    mail: 'restaurant-order@code.berlin',
                    password: 'password123',
                    firstName: 'Max',
                    surName: 'Mustermann',
                    phone: '030 124124189',
                    street: 'Storkower Straße 205a',
                    postCode: '10369',
                    city: 'Berlin',
                    country: 'Germany'
                })
                .then(res => {
                    checkValidAccountResult(res);
                });
        });
        it('wrong create account', function () {
            return chai.request(app)
                .post('/account')
                .type('form')
                .send({
                    mail: 'restaurant-order@code.berlin',
                    firstName: 'Max',
                    surName: 'Mustermann',
                    phone: '030 124124189',
                    street: 'Storkower Straße 205a',
                    postCode: '10369',
                    city: 'Berlin',
                    country: 'Germany'
                })
                .catch(err => err.response)
                .then(res => {
                    checkWrongAccountResult(res);
                });
        });
    });
});

function checkValidAccountResult(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.an('string');
    expect(res.body.mail).to.be.an('string');
    expect(res.body.password).to.be.an('string');
    expect(res.body.firstName).to.be.an('string');
    expect(res.body.surName).to.be.an('string');
    expect(res.body.phone).to.be.an('string');
    expect(res.body.address).to.be.an('object');
    expect(res.body.address.id).to.be.an('string');
    expect(res.body.address.street).to.be.an('string');
    expect(res.body.address.postCode).to.be.an('string');
    expect(res.body.address.city).to.be.an('string');
    expect(res.body.address.country).to.be.an('string');
}

function checkWrongAccountResult(res) {
    expect(res).to.have.status(400);
    expect(res).not.to.be.json;
}
