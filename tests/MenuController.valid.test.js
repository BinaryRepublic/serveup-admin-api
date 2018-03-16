'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');
var menuId;
let restaurantId = '5b428715-8d30-4a27-82f4-565577922aa5';

describe('Menu with valid data', function () {
    this.timeout(1000);
    it('POST /menu with drinks', function () {
        return chai.request(api)
            .post('/menu')
            .type('form')
            .set('content-type', 'application/json')
            .send({
                restaurantId: restaurantId,
                name: 'Saisonkarte',
                drinks: [
                    {
                        name: 'bier',
                        synonym: [
                            'vom fass'
                        ],
                        default: 'jever',
                        child: [
                            {
                                name: 'börsenbier',
                                productName: 'Börsenbier',
                                category: 'Bier',
                                synonym: [
                                    'börse'
                                ],
                                var: [
                                    {
                                        size: 500,
                                        price: 3.9
                                    }
                                ]
                            },
                            {
                                name: 'jever',
                                child: [
                                    {
                                        name: 'pilsener',
                                        category: 'Bier',
                                        productName: 'Jever Pilsener',
                                        var: [
                                            {
                                                size: 500,
                                                price: 3.9
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultParents: [
                    {
                        'name': 'pilsener',
                        'parent': 'jever'
                    }
                ]
            })
            .then(res => {
                checkMenuResponse(res);
                menuId = res.body.id;
            });
    });
    it('POST /menu empty', function () {
        return chai.request(api)
            .post('/menu')
            .type('form')
            .set('content-type', 'application/json')
            .send({
                restaurantId: restaurantId,
                name: 'Saisonkarte'
            })
            .then(res => {
                checkMenuResponse(res);
            });
    });
    it('POST /menu/validate', function () {
        return chai.request(api)
            .post('/menu/validate')
            .type('form')
            .set('content-type', 'application/json')
            .send({
                restaurantId: restaurantId,
                name: 'Saisonkarte',
                drinks: [
                    {
                        name: 'bier',
                        synonym: [
                            'vom fass'
                        ],
                        default: 'jever',
                        child: [
                            {
                                name: 'börsenbier',
                                productName: 'Börsenbier',
                                category: 'Bier',
                                synonym: [
                                    'börse'
                                ],
                                var: [
                                    {
                                        size: 500,
                                        price: 3.9
                                    }
                                ]
                            },
                            {
                                name: 'jever',
                                child: [
                                    {
                                        name: 'pilsener',
                                        category: 'Bier',
                                        productName: 'Jever Pilsener',
                                        var: [
                                            {
                                                size: 500,
                                                price: 3.9
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultParents: [
                    {
                        'name': 'pilsener',
                        'parent': 'jever'
                    }
                ]
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                checkMenuValidateObject(res.body);
            });
    });
    it('GET /menus', function () {
        return chai.request(api)
            .get('/menus?restaurantId=' + restaurantId)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                checkMenuObject(res.body[0]);
                expect(res.body.error).not.to.exist;
            });
    });
    it('GET /menu', function () {
        return chai.request(api)
            .get('/menu/' + menuId)
            .catch(err => err.response)
            .then(res => {
                checkMenuResponse(res);
            });
    });
    it('PUT /menu', function () {
        return chai.request(api)
            .put('/menu/' + menuId)
            .type('form')
            .send({
                name: 'Tageskarte'
            })
            .then(res => {
                checkMenuResponse(res);
                expect(res.body.name).to.be.equal('Tageskarte');
            });
    });
    it('DELETE /menu', function () {
        return chai.request(api)
            .delete('/menu/' + menuId)
            .then(res => {
                checkMenuResponse(res);
            });
    });
});

function checkMenuResponse(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkMenuObject(res.body);
    expect(res.body.error).not.to.exist;
}

function checkMenuObject(accountObj) {
    expect(accountObj.id).to.be.a('string');
    checkMenuValidateObject(accountObj);
}

function checkMenuValidateObject(accountObj) {
    expect(accountObj.name).to.be.a('string');
    expect(accountObj.restaurantId).to.be.a('string');
    expect(accountObj.drinks).to.be.an('array');
    expect(accountObj.defaultParents).to.be.an('array');
}
