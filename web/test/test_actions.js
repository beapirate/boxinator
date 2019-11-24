
import { reloadBoxesFromApi, saveBoxToApi } from '../actions.js'
import assert from 'assert';
import sinon from 'sinon'

describe('actions.js', () => {

    global.fetch = require('node-fetch');
    var fetchMock = require('fetch-mock');
    const dispatch = sinon.spy();


    after(() => {
        global.fetch = undefined;
    })

    afterEach(() => {
        fetchMock.reset();
        dispatch.resetHistory();
    })


    describe("reloadBoxesFromApi", () => {
        it("should emit empty LOAD_SUCCESS action on 200 response", (done) => {
            fetchMock.mock('/api/box', []);
            reloadBoxesFromApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'LOAD_SUCCESS', response: [] },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })

        it("should dispatch LOAD_ERROR action on 404 text response", (done) => {
            fetchMock.mock('/api/box', { status: 404, body: "not found"});
            reloadBoxesFromApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'LOAD_ERROR', error: 'Invalid data from server', response: 'not found' },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })


        it("should dispatch LOAD_ERROR action on 500 text response", (done) => {
            fetchMock.mock('/api/box', { status: 500, body: "server error"});
            reloadBoxesFromApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'LOAD_ERROR', error: 'Invalid data from server', response: 'server error' },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })

        it("should dispatch LOAD_ERROR action on network error", (done) => {
            fetchMock.mock('/api/box', { throws: new Error("connection timeout") });
            reloadBoxesFromApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'LOAD_ERROR', error: "connection timeout" },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })
    })


    describe("saveBoxToApi", () => {
        it("should emit empty SAVE_SUCCESS action on 201 response", (done) => {
            fetchMock.mock('/api/box', { status: 201, body: {} });
            saveBoxToApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'SAVE_SUCCESS', response: {} },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })

        it("should dispatch SAVE_ERROR action on 500 text response", (done) => {
            fetchMock.mock('/api/box', { status: 500, body: "server error"});
            saveBoxToApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'SAVE_ERROR', error: 'Invalid data from server', response: 'server error' },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })

        it("should dispatch SAVE_ERROR action on network error", (done) => {
            fetchMock.mock('/api/box', { throws: new Error("connection timeout") });
            saveBoxToApi()(dispatch).then(() => {
                assert(dispatch.calledOnce);
                assert.deepEqual(
                    { type: 'SAVE_ERROR', error: "connection timeout" },
                    dispatch.getCall(0).args[0]);
                done();
            }).catch(err => done(err));
        })
    })
})