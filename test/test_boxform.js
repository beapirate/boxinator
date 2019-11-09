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
            const { enzymeWrapper } = setup({box: {}, "onColorChange": fn })
            enzymeWrapper.find("#box-color").simulate('change', { });
            assert.equal(fn.callCount, 1);
        })

        it("Should invoke onDestinationCountryChange on country update", () => {
            var fn = sinon.spy();
            const { enzymeWrapper } = setup({box: {}, "onDestinationCountryChange": fn })
            enzymeWrapper.find("#box-destinationCountry").simulate('change', { });
            assert.equal(fn.callCount, 1);
        })
    })
})