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
            .set('content-type', 'application/json')
            .send({})
            .catch(err => err.response)
            .then(res => {
                checkMenuResponse(res);
            });
    });
    it('GET /menus', function () {
        return chai.request(api)
            .get('/menus')
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                checkErrorObject(res.body.error);
                checkMenuObject(res.body);
            });
    });
    // it('GET /restaurant', function () {
    //     return chai.request(api)
    //         .get('/restaurant/dasdu23urhas9da72easdau3j')
    //         .catch(err => err.response)
    //         .then(res => {
    //             checkInvalidRestaurantIdResponse(res);
    //         });
    // });
    // it('PUT /restaurant', function () {
    //     return chai.request(api)
    //         .put('/restaurant/dasdu23urhas9da72easdau3j')
    //         .type('form')
    //         .set('content-type', 'application/json')
    //         .send({
    //             password: undefined
    //         })
    //         .catch(err => err.response)
    //         .then(res => {
    //             checkInvalidRestaurantIdResponse(res);
    //         });
    // });
    // it('DELETE /account', function () {
    //     return chai.request(api)
    //         .delete('/account/dasdu23urhas9da72easdau3j')
    //         .catch(err => err.response)
    //         .then(res => {
    //             checkInvalidRestaurantIdResponse(res);
    //         });
    // });
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

function checkInvalidRestaurantIdResponse(res) {
    expect(res).to.have.status(500);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
    checkRestaurantObject(res.body);
}
