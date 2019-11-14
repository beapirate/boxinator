import React from 'react';
import { connect } from 'react-redux';

const BoxList = ({ boxes }) => {
    return <table>
        <tr>
          <th>Receiver</th>
          <th>Weight</th>
          <th>Box color</th>
          <th>Shipping cost</th>
        </tr>
        {boxes.map(i => {
          return <tr>
            <td>{i.recipient_name}</td>
            <td>{i.weight} kilograms</td>
            <td style={{ "background-color": i.color }}></td>
            <td>SEK</td>
          </tr>
        })}
    </table>
}

const mapStateToProps = state => {
    return {
      boxes: state.boxes
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }

const ConnectedBoxList = connect(mapStateToProps, mapDispatchToProps)(BoxList)
export { BoxList as UnconnectedBoxList };
export default ConnectedBoxList;