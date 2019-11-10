import boxes from '../reducers/boxes.js';
import assert from 'assert';
import sinon from 'sinon';

describe('reucers/boxes', () => {

  describe('boxes reducer', () => {

    it("should initialize state", () => {
        var state = boxes(undefined, {})
        assert.notEqual(state, undefined);
        assert.equal(state.length, 0);
    })

    it("should add box from response on SAVE_SUCCESS action", () => {
        var state = boxes(undefined, {
            type: "SAVE_SUCCESS",
            response: {
                "box_id": 1,
                "recipient_name": " TestRecipient1",
                "weight": 1.1,
                "color": "#111111",
                "destination_country": "Brazil"
            }
        })

        assert.equal(state.length, 1);
    })

  })
})