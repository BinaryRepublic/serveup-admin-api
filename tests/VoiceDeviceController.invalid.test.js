'use strict';
 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');

let restaurantId = '5b428715-8d30-4a27-82f4-565577922aa5';

describe('VoiceDevice with invalid data', function () {
    this.timeout(1000);
    it('POST /voiceDevice', function () {
        return chai.request(api)
            .post('/voiceDevice')
            .type('form')
            .set('content-type', 'application/json')
            .send({
                restaurantId: restaurantId,
                number: 2
            })
            .catch(err => err.response)
            .then(res => {
                checkVoiceDeviceResponse(res);
            });
    });
    it('GET /voiceDevices', function () {
        return chai.request(api)
            .get('/voiceDevices?restaurantId=dasdu23urhas9da72easdau3j')
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(500);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                checkErrorObject(res.body.error);
                checkVoiceDeviceObject(res.body);
            });
    });
    it('GET /voiceDevice', function () {
        return chai.request(api)
            .get('/voiceDevice/dasdu23urhas9da72easdau3j')
            .catch(err => err.response)
            .then(res => {
                checkInvalidVoiceDeviceIdResponse(res);
            });
    });
    it('PUT /voiceDevice', function () {
        return chai.request(api)
            .put('/voiceDevice/dasdu23urhas9da72easdau3j')
            .type('form')
            .set('content-type', 'application/json')
            .send({
                password: undefined
            })
            .catch(err => err.response)
            .then(res => {
                checkInvalidVoiceDeviceIdResponse(res);
            });
    });
    it('DELETE /voiceDevice', function () {
        return chai.request(api)
            .delete('/voiceDevice/dasdu23urhas9da72easdau3j')
            .catch(err => err.response)
            .then(res => {
                checkInvalidVoiceDeviceIdResponse(res);
            });
    });
});

function checkVoiceDeviceResponse(res) {
    expect(res).to.have.status(400);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkVoiceDeviceObject(res.body);
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
}

function checkErrorObject(errorObj) {
    expect(errorObj).to.exist;
    expect(errorObj.type).to.be.a('string');
    expect(errorObj.msg).to.be.a('string');
}

function checkVoiceDeviceObject(accountObj) {
    expect(accountObj.id).not.to.exist;
    expect(accountObj.restaurantId).not.to.exist;
    expect(accountObj.name).not.to.exist;
}

function checkInvalidVoiceDeviceIdResponse(res) {
    expect(res).to.have.status(500);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.be.an('object');
    checkErrorObject(res.body.error);
    checkVoiceDeviceObject(res.body);
}
