import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import assert from 'assert';
import { UnconnectedBoxForm } from '../components/BoxForm'


Enzyme.configure({ adapter: new Adapter() })

function setup(box) {
  const props = { box: box }
  const enzymeWrapper = shallow((<UnconnectedBoxForm {...props} />))
  return {
      props,
      enzymeWrapper
    }
}

describe('components', () => {
    describe('BoxForm', () => {

        it("Should include recipient name of box in output", () => {
            const { enzymeWrapper } = setup({ "recipient_name": "RecipientName1" })
            assert(enzymeWrapper.html().includes("RecipientName1"), enzymeWrapper.html())
        })
        
        it("Should include weight of box  in output", () => {
            const { enzymeWrapper } = setup({ "weight": "1.0" })
            assert(enzymeWrapper.html().includes("1.0"), enzymeWrapper.html())
        })

        /*
        it("Should include color of box in output", () => {
            const { enzymeWrapper } = setup({ "color": [0,0,0] })
            assert(enzymeWrapper.html().includes("#000000"), enzymeWrapper.html())
        })
        */

        it("Should include destination country of box  in output", () => {
            const { enzymeWrapper } = setup({ "destination_country": "Sweden" })
            assert(enzymeWrapper.html().includes("Sweden"), enzymeWrapper.html())
        })
    })
})