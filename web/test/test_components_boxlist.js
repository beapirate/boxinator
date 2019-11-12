import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import assert from 'assert';
import { UnconnectedBoxList } from '../components/BoxList'


Enzyme.configure({ adapter: new Adapter() })

function setup(props) {
  const enzymeWrapper = shallow((<UnconnectedBoxList {...props} />))
  return {
      props,
      enzymeWrapper
    }
}

describe('components', () => {
    describe('BoxList', () => {

        it("Should be possible to render as .html()", () => {
            const { enzymeWrapper } = setup({boxes: []})
            enzymeWrapper.html();
        })
    })
})