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


  describe("should handle SET_DESTINATION_COUNTRY", () => {
    var initstate = boxes(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update destination country property", () => {
      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Test"});
      assert.equal(state.destination_country, "Test");
    })

    it("should flag empty contry name as invalid", () => {
      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: ""});
      assert.equal(state.destination_country.error, "required");
    })

    it("should flag non existing country as invalid", () => {
      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Test"});
      assert.equal(state.destination_country.error, "invalid");
    })

    it("should accept valid country name with case variation and surrounding whitespace", () => {
      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Sweden"});
      assert.equal(state.destination_country.error, undefined);

      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: "sweden"});
      assert.equal(state.destination_country.error, undefined);

      var state = boxes(initstate, {type: "SET_DESTINATION_COUNTRY", name: " Sweden"});
      assert.equal(state.destination_country.error, undefined);
    })
  })


  describe("should handle SET_WEIGHT action", () => {
    var initstate = boxes(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update weight property", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "0.0"});
      assert.equal(state.weight, "0.0");
    })

    it("should not allow freetext value", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "text"});
      assert.equal(state.weight, "text");
      assert.equal(state.weight.error, "invalid");
    })

    it("should allow integer formatted number", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "1"});
      assert.equal(state.weight, "1");
      assert.equal(state.weight.error, undefined);
    })

    it("should allow decimals", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "1.1"});
      assert.equal(state.weight, "1.1");
      assert.equal(state.weight.numeric, 1.1);
      assert.equal(state.weight.error, undefined);
    })

    it("should allow comma as decimal separator", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "1,1"});
      assert.equal(state.weight, "1,1");
      assert.equal(state.weight.numeric, 1.1);
      assert.equal(state.weight.error, undefined);
    })

    it("should not allow text as decimal", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "1.ee"});
      assert.equal(state.weight, "1.ee");
      assert.equal(state.weight.error, "invalid");
    })

    it("should not allow negative weight", () => {
      var state = boxes(initstate, {type: "SET_WEIGHT", weight: "-1"});
      assert.equal(state.weight, "-1");
      assert.equal(state.weight.error, "negative");
    })
  })


  describe("should handle SET_BOX_COLOR action", () => {
    var initstate = boxes(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update color property", () => {
      var state = boxes(initstate, {type: "SET_BOX_COLOR", color: [0, 0, 0]});
      assert.equal(state.color.toString(), [0, 0, 0].toString());
    })
  })
})
