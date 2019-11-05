import boxes from '../reducers/boxes.js';
import assert from 'assert';

describe('reucers/boxes', () => {

  it('should have no initial state', () => {
    assert.equal(boxes(undefined, {}), undefined)
  })

  describe('should handle CREATE_NEW_BOX', () => {
    var state = boxes(undefined, { type: 'CREATE_NEW_BOX' })

    it('should add box to state', () => {
      assert.notEqual(state, undefined);
    })

    it("should default to empty recipient name", () => {
      assert.equal(state.recipient_name.toString(), "");
    })

    it("should flag default recipient name as invalid", () => {
      assert.equal(state.recipient_name.error, "required");
    })

    it("should default to 0.0 kg box weight", () => {
      assert.equal(state.weight, "0.0");
    })

    it("should flag default weight as invalid", () => {
      assert.equal(state.weight.error, "required");
    })

    it("should not define a default destination country", () => {
      assert.equal(state.destination_country, "");
    })

    it("should flag destination country as invalid", () => {
      assert.equal(state.destination_country.error, "required");
    })

    it("should not define a default box color", () => {
      assert.equal(state.color, "");
    })

    it("should flag default box color as invalid", () => {
      assert.equal(state.color.error, "required");
    })

  })

  describe("should handle SET_RECIPIENT_NAME", () => {
    var initstate = boxes(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update recipient name property", () => {
      var state = boxes(initstate, {type: "SET_RECIPIENT_NAME", name: "Test"});
      assert.equal(state.recipient_name, "Test");
    })

    it("should flag empty recipient name as invalid", () => {
      var state = boxes(initstate, {type: "SET_RECIPIENT_NAME", name: ""});
      assert.equal(state.recipient_name.error, "required");
    })

    it("should flag whitespace only recipient name as invalid", () => {
      var state = boxes(initstate, {type: "SET_RECIPIENT_NAME", name: " "});
      assert.equal(state.recipient_name.error, "required");
    })

    it("should not flag other recipient names as invalid", () => {
      var state = boxes(initstate, {type: "SET_RECIPIENT_NAME", name: "Test"});
      assert.equal(state.recipient_name.error, undefined);
    })


  })
})
