import boxes from '../reducers/boxes.js';
import assert from 'assert';


// workaround for broken array comparison, consider using some kind of library
const assertdataequal = (actual, expected) => {
    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
}

describe('reucers/boxes', () => {

  it('initial state', () => {
    assertdataequal(boxes(undefined, {}), [])
  })
})
