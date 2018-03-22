'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');
var restaurantId;
let accountId = '9b9ec7df-fd11-4bf9-982b-e82fe83d4624';

describe('Restaurant with valid data', function () {
    this.timeout(1000);
    it('POST /restaurant', function () {
        return chai.request(api)
            .post('/restaurant')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                name: 'Zur goldenen Möwe',
                accountId: accountId,
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
    it('GET /restaurants', function () {
        return chai.request(api)
            .get('/restaurants?accountId=' + accountId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                checkRestaurantObject(res.body[0]);
                expect(res.body.error).not.to.exist;
            });
    });
    it('GET /restaurant', function () {
        return chai.request(api)
            .get('/restaurant/' + restaurantId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkRestaurantResponse(res);
            });
    });
    it('PUT /restaurant', function () {
        return chai.request(api)
            .put('/restaurant/' + restaurantId)
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                name: 'Mikas Pommesbude'
            })
            .then(res => {
                checkRestaurantResponse(res);
                expect(res.body.name).to.be.equal('Mikas Pommesbude');
            });
    });
    it('DELETE /restaurant', function () {
        return chai.request(api)
            .delete('/restaurant/' + restaurantId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkRestaurantResponse(res);
            });
    });
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
