'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');
var restaurantId;

describe('Restaurant with valid data', function () {
    this.timeout(1000);
    it('POST /restaurant', function () {
        return chai.request(api)
            .post('/restaurant')
            .type('form')
            .send({
                name: 'Zur goldenen Möwe',
                accountId: '9b9ec7df-fd11-4bf9-982b-e82fe83d4624',
                street: 'Storkower Straße 205a',
                postCode: '10369',
                city: 'Berlin',
                country: 'Germany'
            })
            .then(res => {
                checkRestaurantResponse(res);
                restaurantId = res.body.id;
            });
    });
    // it('GET /accounts', function () {
    //     return chai.request(api)
    //         .get('/accounts')
    //         .then(res => {
    //             expect(res).to.have.status(200);
    //             expect(res).to.be.json;
    //             expect(res.body).to.be.an('array');
    //             checkAccountObject(res.body[0]);
    //             expect(res.body.error).not.to.exist;
    //         });
    // });
    // it('GET /account', function () {
    //     return chai.request(api)
    //         .get('/account/' + accountId)
    //         .then(res => {
    //             checkAccountResponse(res);
    //         });
    // });
    // it('PUT /account', function () {
    //     return chai.request(api)
    //         .put('/account/' + accountId)
    //         .type('form')
    //         .send({
    //             password: 'NEUESpassword123'
    //         })
    //         .then(res => {
    //             checkAccountResponse(res);
    //             expect(res.body.password).to.be.equal('NEUESpassword123');
    //         });
    // });
    // it('DELETE /account', function () {
    //     return chai.request(api)
    //         .delete('/account/' + accountId)
    //         .then(res => {
    //             checkAccountResponse(res);
    //         });
    // });
});

function checkRestaurantResponse(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkRestaurantObject(res.body);
    expect(res.body.error).not.to.exist;
}

function checkRestaurantObject(accountObj) {
    expect(accountObj.id).to.be.a('string');
    expect(accountObj.name).to.be.a('string');
    expect(accountObj.accountId).to.be.a('string');
    expect(accountObj.street).to.be.a('string');
    expect(accountObj.postCode).to.be.a('string');
    expect(accountObj.city).to.be.a('string');
    expect(accountObj.country).to.be.a('string');
}
