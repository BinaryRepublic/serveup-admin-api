'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');

describe('Menu with invalid data', function () {
    this.timeout(1000);
    it('POST /menu', function () {
        return chai.request(api)
            .post('/menu')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({})
            .catch(err => err.response)
            .then(res => {
                checkMenuResponse(res);
            });
    });
    it('GET /menus', function () {
        return chai.request(api)
            .get('/menus?restaurantId=dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(500);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                checkErrorObject(res.body.error);
                checkMenuObject(res.body);
            });
    });
    it('GET /menu', function () {
        return chai.request(api)
            .get('/menu/dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                checkInvalidMenuIdResponse(res);
            });
    });
    it('PUT /menu', function () {
        return chai.request(api)
            .put('/menu/dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .type('form')
            .send({
                name: 123
            })
            .catch(err => err.response)
            .then(res => {
                checkInvalidMenuIdResponse(res);
            });
    });
    it('DELETE /menu', function () {
        return chai.request(api)
            .delete('/menu/dasdu23urhas9da72easdau3j')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .catch(err => err.response)
            .then(res => {
                checkInvalidMenuIdResponse(res);
            });
    });
});

function checkMenuResponse(res) {
    expect(res).to.have.status(400);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkMenuObject(res.body);
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
}

function checkErrorObject(errorObj) {
    expect(errorObj).to.exist;
    expect(errorObj.type).to.be.a('string');
    expect(errorObj.msg).to.be.a('string');
}

function checkMenuObject(accountObj) {
    expect(accountObj.id).not.to.exist;
    expect(accountObj.restaurantId).not.to.exist;
    expect(accountObj.name).not.to.exist;
    expect(accountObj.drinks).not.to.exist;
    expect(accountObj.defaultParents).not.to.exist;
}

function checkInvalidMenuIdResponse(res) {
    expect(res).to.have.status(500);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
    checkMenuObject(res.body);
}
