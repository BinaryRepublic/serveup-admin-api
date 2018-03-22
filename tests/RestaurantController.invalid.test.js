'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');

describe('Restaurant with invalid data', function () {
    this.timeout(1000);
    it('POST /restaurant', function () {
        return chai.request(api)
            .post('/restaurant')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({})
            .catch(err => err.response)
            .then(res => {
                checkRestaurantResponse(res);
            });
    });
    it('GET /restaurants', function () {
        return chai.request(api)
            .get('/restaurants')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                checkErrorObject(res.body.error);
                checkRestaurantObject(res.body);
            });
    });
    it('GET /restaurant', function () {
        return chai.request(api)
            .get('/restaurant/dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                checkInvalidRestaurantIdResponse(res);
            });
    });
    it('PUT /restaurant', function () {
        return chai.request(api)
            .put('/restaurant/dasdu23urhas9da72easdau3j')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                password: undefined
            })
            .catch(err => err.response)
            .then(res => {
                checkInvalidRestaurantIdResponse(res);
            });
    });
    it('DELETE /restaurant', function () {
        return chai.request(api)
            .delete('/restaurant/dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                checkInvalidRestaurantIdResponse(res);
            });
    });
});

function checkRestaurantResponse(res) {
    expect(res).to.have.status(400);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkRestaurantObject(res.body);
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
}

function checkErrorObject(errorObj) {
    expect(errorObj).to.exist;
    expect(errorObj.type).to.be.a('string');
    expect(errorObj.msg).to.be.a('string');
}

function checkRestaurantObject(accountObj) {
    expect(accountObj.id).not.to.exist;
    expect(accountObj.accountId).not.to.exist;
    expect(accountObj.name).not.to.exist;
    expect(accountObj.street).not.to.exist;
    expect(accountObj.postCode).not.to.exist;
    expect(accountObj.city).not.to.exist;
    expect(accountObj.country).not.to.exist;
}

function checkInvalidRestaurantIdResponse(res) {
    expect(res).to.have.status(500);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
    checkRestaurantObject(res.body);
}
