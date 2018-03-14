'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');

describe('Account with invalid data', function () {
    this.timeout(1000);
    it('POST /account', function () {
        return chai.request(api)
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
                checkAccountResponse(res);
            });
    });
    it('GET /accounts', function () {
        return chai.request(api)
            .get('/accounts')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });
    it('GET /account', function () {
        return chai.request(api)
            .get('/account/dasdu23urhas9da72easdau3j')
            .catch(err => err.response)
            .then(res => {
                checkInvalidAccountIdResponse(res);
            });
    });
    it('PUT /account', function () {
        return chai.request(api)
            .put('/account/dasdu23urhas9da72easdau3j')
            .type('form')
            .send({
                password: undefined
            })
            .catch(err => err.response)
            .then(res => {
                checkInvalidAccountIdResponse(res);
            });
    });
    it('DELETE /account', function () {
        return chai.request(api)
            .delete('/account/dasdu23urhas9da72easdau3j')
            .catch(err => err.response)
            .then(res => {
                checkInvalidAccountIdResponse(res);
            });
    });
});

function checkAccountResponse(res) {
    expect(res).to.have.status(400);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkAccountObject(res.body);
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
}

function checkErrorObject(errorObj) {
    expect(errorObj).to.exist;
    expect(errorObj.type).to.be.a('string');
    expect(errorObj.msg).to.be.a('string');
}

function checkAccountObject(accountObj) {
    expect(accountObj.id).not.to.exist;
    expect(accountObj.mail).not.to.exist;
    expect(accountObj.password).not.to.exist;
    expect(accountObj.firstName).not.to.exist;
    expect(accountObj.surName).not.to.exist;
    expect(accountObj.phone).not.to.exist;
    expect(accountObj.address).not.to.exist;
}

function checkInvalidAccountIdResponse(res) {
    expect(res).to.have.status(500);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
    checkAccountObject(res.body);
}
