import newbox from '../reducers/newbox.js';
import assert from 'assert';
import sinon from 'sinon';

describe('reucers/newbox', () => {

  describe('should handle CREATE_NEW_BOX', () => {
    var state = newbox(undefined, { type: 'CREATE_NEW_BOX' })

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
    var initstate = newbox(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update recipient name property", () => {
      var state = newbox(initstate, {type: "SET_RECIPIENT_NAME", name: "Test"});
      assert.equal(state.recipient_name, "Test");
    })

    it("should flag empty recipient name as invalid", () => {
      var state = newbox(initstate, {type: "SET_RECIPIENT_NAME", name: ""});
      assert.equal(state.recipient_name.error, "required");
    })

    it("should flag whitespace only recipient name as invalid", () => {
      var state = newbox(initstate, {type: "SET_RECIPIENT_NAME", name: " "});
      assert.equal(state.recipient_name.error, "required");
    })

    it("should not flag other recipient names as invalid", () => {
      var state = newbox(initstate, {type: "SET_RECIPIENT_NAME", name: "Test"});
      assert.equal(state.recipient_name.error, undefined);
    })
  })


  describe("should handle SET_DESTINATION_COUNTRY", () => {
    var initstate = newbox(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update destination country property", () => {
      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Test"});
      assert.equal(state.destination_country, "Test");
    })

    it("should flag empty contry name as invalid", () => {
      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: ""});
      assert.equal(state.destination_country.error, "required");
    })

    it("should flag non existing country as invalid", () => {
      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Test"});
      assert.equal(state.destination_country.error, "invalid");
    })

    it("should accept valid country name with case variation and surrounding whitespace", () => {
      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: "Sweden"});
      assert.equal(state.destination_country.error, undefined);

      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: "sweden"});
      assert.equal(state.destination_country.error, undefined);

      var state = newbox(initstate, {type: "SET_DESTINATION_COUNTRY", name: " Sweden"});
      assert.equal(state.destination_country.error, undefined);
    })
  })


  describe("should handle SET_WEIGHT action", () => {
    var initstate = newbox(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update weight property", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "0.0"});
      assert.equal(state.weight, "0.0");
    })

    it("should not allow freetext value", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "text"});
      assert.equal(state.weight, "text");
      assert.equal(state.weight.error, "invalid");
    })

    it("should allow integer formatted number", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "1"});
      assert.equal(state.weight, "1");
      assert.equal(state.weight.error, undefined);
    })

    it("should allow decimals", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "1.1"});
      assert.equal(state.weight, "1.1");
      assert.equal(state.weight.numeric, 1.1);
      assert.equal(state.weight.error, undefined);
    })

    it("should allow comma as decimal separator", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "1,1"});
      assert.equal(state.weight, "1,1");
      assert.equal(state.weight.numeric, 1.1);
      assert.equal(state.weight.error, undefined);
    })

    it("should not allow text as decimal", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "1.ee"});
      assert.equal(state.weight, "1.ee");
      assert.equal(state.weight.error, "invalid");
    })

    it("should not allow negative weight", () => {
      var state = newbox(initstate, {type: "SET_WEIGHT", weight: "-1"});
      assert.equal(state.weight, "-1");
      assert.equal(state.weight.error, "negative");
    })
  })


  describe("should handle SET_BOX_COLOR action", () => {
    var initstate = newbox(undefined, { type: 'CREATE_NEW_BOX' })

    it("should update color property", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 0, 0]});
      assert.equal(state.color.toString(), [0, 0, 0].toString());
    })

    it("should validate input type and array length", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: {}});
      assert.equal(state.color.error, "invalid");

      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 0]});
      assert.equal(state.color.error, "invalid");
    })

    it("should validate rgb values range", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [-1, 0, 0]});
      assert.equal(state.color.error, "invalid");

      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 0, 256]});
      assert.equal(state.color.error, "invalid");
    })

    it("should not allow blue boxes", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 0, 255]});
      assert.equal(state.color.error, "blue");

      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 255, 255]});
      assert.equal(state.color.error, "blue");

      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [64, 0, 255]});
      assert.equal(state.color.error, "blue");
    })

    it("should allow red and green boxes", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [255, 0, 0]});
      assert.equal(state.color.error, undefined);

      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 255, 0]});
      assert.equal(state.color.error, undefined);
    })

    it("should allow purple box", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [128, 0, 255]});
      assert.equal(state.color.error, undefined);
    })

    it("should allow green box", () => {
      var state = newbox(initstate, {type: "SET_BOX_COLOR", color: [0, 255, 191]});
      assert.equal(state.color.error, undefined);
    })
  })


  describe("Should handle TOGGLE_COLOR_PICKER action", () => {
    var initstate = newbox(undefined, {});

    it("Should set colorPickerVisible on first action", () => {
      var state = newbox(initstate, {type: "TOGGLE_COLOR_PICKER"});
      assert(state.colorPickerVisible);
    })
  })


  describe("Should handle SAVE_ERROR action", () => {
    var initstate = newbox(undefined, {type: 'CREATE_NEW_BOX' });

    it("Should not throw exception on empty error list", () => {
      newbox(initstate, { type: "SAVE_ERROR", response: { errors: []} });
    })

    it("Should set error from server on recipient name error property", () => {
      var state = newbox(initstate, { type: "SAVE_ERROR", response: { errors: [
          {property: "recipient_name", error: "servererror1" }
      ]} });
      assert.equal(state.recipient_name.error, "servererror1");
    })

    it("Should log error to console if invalid property name is received", () => {
      var console_error = sinon.spy(console, "error");
      var state = newbox(initstate, { type: "SAVE_ERROR", response: { errors: [
        {property: "invalid_name", error: "servererror2" }
      ]} });

      console_error.restore() //XXX - use test fixtures..
      assert.equal(console_error.callCount, 1);
    })

    it("Should not not consider saved status a valid property", () => {
      var state = newbox(initstate, { type: "SAVE_ERROR", response: { errors: [
        {property: "saved", error: true }
      ]} });
      assert.equal(state.saved, false);
    })
  })


  describe("Should handle SAVE_SUCCESS action", () => {

  })
})
