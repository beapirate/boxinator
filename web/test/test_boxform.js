import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import assert from 'assert';
import { UnconnectedBoxForm } from '../components/BoxForm'


Enzyme.configure({ adapter: new Adapter() })

function setup(props) {
  const enzymeWrapper = shallow((<UnconnectedBoxForm {...props} />))
  return {
      props,
      enzymeWrapper
    }
}

describe('components', () => {
    describe('BoxForm', () => {

        it("Should include recipient name of box in output", () => {
            const { enzymeWrapper } = setup({box : { "recipient_name": "RecipientName1" }})
            assert(enzymeWrapper.html().includes("RecipientName1"), enzymeWrapper.html())
        })
        
        it("Should include weight of box in output", () => {
            const { enzymeWrapper } = setup({box: { "weight": "1.0" }})
            assert(enzymeWrapper.html().includes("1.0"), enzymeWrapper.html())
        })

        it("Should include color of box in output", () => {
            const { enzymeWrapper } = setup({box: { "color": [1,1,1] }})
            assert(enzymeWrapper.html().includes("#010101"), enzymeWrapper.html())
        })

        it("Should include destination country of box in output", () => {
            const { enzymeWrapper } = setup({box: { "destination_country": "Sweden" }})
            assert(enzymeWrapper.html().includes("Sweden"), enzymeWrapper.html())
        })


        it("Should invoke onRecipientNameChange on name update", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: {}, "onRecipientNameChange": fn })
            enzymeWrapper.find("#box-recipientName").simulate('change', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should invoke onBoxWeightChanged on weight update", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: {}, "onBoxWeightChange": fn })
            enzymeWrapper.find("#box-weight").simulate('change', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should invoke onColorChange on color update", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: { colorPickerVisible: true }, "onColorChange": fn });
            // this is actually ChromePicker, but wrapper.debug() shows ColorPicker...
            enzymeWrapper.find("ColorPicker").prop('onChange')(); // simulate('change', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should invoke onDestinationCountryChange on country update", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: {}, "onDestinationCountryChange": fn })
            enzymeWrapper.find("#box-destinationCountry").simulate('change', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should invoke onSave on Save click", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: {}, "onSave": fn })
            enzymeWrapper.find("#box-save").simulate('click', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should include box-form-valid and no box-form-error if no properties have errors", () => {
            var { enzymeWrapper } = setup({box : {}})
            const noError = enzymeWrapper.html();

            assert(noError.indexOf("box-form-error") < 0);
            assert(noError.indexOf("box-form-valid") >= 0);
        })

   
        it("Should not include color picker if colorPickerVisible is not set", () => {
            const { enzymeWrapper } = setup({box: { "colorPickerVisible": false } });
            // this is actually ChromePicker, but wrapper.debug() shows ColorPicker...
            assert.equal(enzymeWrapper.find("ColorPicker").length, 0);
        })

        it("Should include color picker if colorPickerVisible is set", () => {
            const { enzymeWrapper } = setup({box: { "colorPickerVisible": true } });
            // this is actually ChromePicker, but wrapper.debug() shows ColorPicker...
            assert.equal(enzymeWrapper.find("ColorPicker").length, 1);
        })

        var setError = (value, err) => {
            const obj = new String(value);
            obj.error = err;
            return obj;
        }

        it("Should only include box-form-error class in output if property has error", () => {
            var { enzymeWrapper } = setup({box : { "recipient_name": "RecipientName1" }})
            const noError = enzymeWrapper.html();
            var { enzymeWrapper } = setup({box : { "recipient_name": setError("RecipientName1", "invalid") }})
            const withError = enzymeWrapper.html();

            assert(noError.indexOf("box-form-error") < 0);
            assert(withError.indexOf("box-form-error") >= 0);
        })

        it("Should not generate same output if recipient_property has error", () => {
            var { enzymeWrapper } = setup({box : { "recipient_name": "RecipientName1" }})
            const noError = enzymeWrapper.html();
            var { enzymeWrapper } = setup({box : { "recipient_name": setError("RecipientName1", "invalid") }})
            const withError = enzymeWrapper.html();
            assert.notEqual(withError, noError);
        })

        it("Should not generate same output if weight property has error", () => {
            var { enzymeWrapper } = setup({box : { "weight": "0.1" }})
            const noError = enzymeWrapper.html();
            var { enzymeWrapper } = setup({box : { "weight": setError("0.1", "invalid") }})
            const withError = enzymeWrapper.html();
            assert.notEqual(withError, noError);
        })

        it("Should not generate same output if color property has error", () => {
            var { enzymeWrapper } = setup({box : { "color": [0,0,254] }})
            const noError = enzymeWrapper.html();
            var { enzymeWrapper } = setup({box : { "color": setError([0,0,254], "blue") }})
            const withError = enzymeWrapper.html();
            assert.notEqual(withError, noError);
        })

        it("Should not generate same output if destination country property has error", () => {
            var { enzymeWrapper } = setup({box : { "destination_country": "Norway" }})
            const noError = enzymeWrapper.html();
            var { enzymeWrapper } = setup({box : { "destination_country": setError("Norway", "invalid") }})
            const withError = enzymeWrapper.html();
            assert.notEqual(withError, noError);
        })

        it("Should not enable submit buttton if errors are present", () => {
            var { enzymeWrapper } = setup({box : { "destination_country": setError("Norway", "invalid") }})
            assert(enzymeWrapper.find("#box-save").prop('disabled'));
        })

        it("Should not enable submit buttton if box is already saved", () => {
            var { enzymeWrapper } = setup({box : { saved: true }})
            assert(enzymeWrapper.find("#box-save").prop('disabled'));
        })

        it("Should include global error info if present in state", () => {
            var { enzymeWrapper } = setup({error: "global error message", box : { "recipient_name": "RecipientName1" }})
            const withError = enzymeWrapper.html();
            assert(withError.indexOf("global error message") >= 0);
        })
    })
})