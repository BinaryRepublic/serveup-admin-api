'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');
var accountId;

describe('Account with valid data', function () {
    this.timeout(1000);
    it('POST /account', function () {
        return chai.request(api)
            .post('/account')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
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
                checkAccountResponse(res);
                accountId = res.body.id;
            });
    });
    it('GET /accounts', function () {
        return chai.request(api)
            .get('/accounts')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                checkAccountObject(res.body[0]);
                expect(res.body.error).not.to.exist;
            });
    });
    it('GET /account', function () {
        return chai.request(api)
            .get('/account/' + accountId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkAccountResponse(res);
            });
    });
    it('PUT /account', function () {
        return chai.request(api)
            .put('/account/' + accountId)
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                password: 'NEUESpassword123'
            })
            .then(res => {
                checkAccountResponse(res);
                expect(res.body.password).to.be.equal('NEUESpassword123');
            });
    });
    it('DELETE /account', function () {
        return chai.request(api)
            .delete('/account/' + accountId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkAccountResponse(res);
            });
    });
});

function checkAccountResponse(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkAccountObject(res.body);
    expect(res.body.error).not.to.exist;
}

function checkAccountObject(accountObj) {
    expect(accountObj.id).to.be.a('string');
    expect(accountObj.mail).to.be.a('string');
    expect(accountObj.password).to.be.a('string');
    expect(accountObj.firstName).to.be.a('string');
    expect(accountObj.surName).to.be.a('string');
    expect(accountObj.phone).to.be.a('string');
    expect(accountObj.street).to.be.a('string');
    expect(accountObj.postCode).to.be.a('string');
    expect(accountObj.city).to.be.a('string');
    expect(accountObj.country).to.be.a('string');
}
