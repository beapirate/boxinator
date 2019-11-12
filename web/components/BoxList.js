import React from 'react';
import { connect } from 'react-redux';

const BoxList = ({ boxes }) => {
    return <ul>
        {boxes.map(i => <li>{i.recipient_name}</li>)}
    </ul>
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