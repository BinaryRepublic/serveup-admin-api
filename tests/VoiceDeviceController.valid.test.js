'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

let api = require('../app.js');
var voiceDeviceId;
let restaurantId = '5b428715-8d30-4a27-82f4-565577922aa5';

describe('VoiceDevice with valid data', function () {
    this.timeout(1000);
    it('POST /voiceDevice', function () {
        return chai.request(api)
            .post('/voiceDevice')
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                restaurantId: restaurantId,
                number: '2'
            })
            .then(res => {
                checkVoiceDeviceResponse(res);
                voiceDeviceId = res.body.id;
            });
    });
    it('GET /voiceDevices', function () {
        return chai.request(api)
            .get('/voiceDevices?restaurantId=' + restaurantId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                checkVoiceDeviceObject(res.body[0]);
                expect(res.body.error).not.to.exist;
            });
    });
    it('GET /voiceDevice', function () {
        return chai.request(api)
            .get('/voiceDevice/' + voiceDeviceId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkVoiceDeviceResponse(res);
            });
    });
    it('PUT /voiceDevice', function () {
        return chai.request(api)
            .put('/voiceDevice/' + voiceDeviceId)
            .type('form')
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .send({
                number: '5'
            })
            .then(res => {
                checkVoiceDeviceResponse(res);
                expect(res.body.number).to.be.equal('5');
            });
    });
    it('DELETE /voiceDevice', function () {
        return chai.request(api)
            .delete('/voiceDevice/' + voiceDeviceId)
            .set({'Accept': 'application/json', 'Access-Token': 'unittest'})
            .then(res => {
                checkVoiceDeviceResponse(res);
            });
    });
});

function checkVoiceDeviceResponse(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an('object');
    checkVoiceDeviceObject(res.body);
    expect(res.body.error).not.to.exist;
}

function checkVoiceDeviceObject(accountObj) {
    expect(accountObj.id).to.be.a('string');
    expect(accountObj.number).to.be.a('string');
    expect(accountObj.restaurantId).to.be.a('string');
}
