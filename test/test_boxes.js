import boxes from '../reducers/boxes.js';
import assert from 'assert';


// workaround for broken array comparison, consider using some kind of library
const assertdataequal = (actual, expected) => {
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('reucers/boxes', () => {

  it('should have no initial state', () => {
    assertdataequal(boxes(undefined, {}), [])
  })

  describe('should handle CREATE_NEW_BOX', () => {
    var state = boxes([], { type: 'CREATE_NEW_BOX' })

    it('should add box to list of boxes', () => {
      assert.equal(state.length, 1);
    })

    it("should default to empty recipient name", () => {
      assert.equal(state[0].recipient_name.toString(), "");
    })

    it("should flag default recipient name as invalid", () => {
      assert.equal(state[0].recipient_name.error, "required");
    })

    it("should default to 0.0 kg box weight", () => {
      assert.equal(state[0].weight, "0.0");
    })

    it("should flag default weight as invalid", () => {
      assert.equal(state[0].weight.error, "required");
    })

    it("should not define a default destination country", () => {
      assert.equal(state[0].destination_country, "");
    })

    it("should flag destination country as invalid", () => {
      assert.equal(state[0].destination_country.error, "required");
    })

    it("should not define a default box color", () => {
      assert.equal(state[0].color, "");
    })

    it("should flag default box color as invalid", () => {
      assert.equal(state[0].color.error, "required");
    })

  })
})
