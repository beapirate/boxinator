import React from 'react';
import { connect } from 'react-redux';
import {rgb2hex } from '@swiftcarrot/color-fns';

const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onDestinationCountryChange}) => {

    const boxColorHex = box.color != undefined ? rgb2hex(box.color[0], box.color[1], box.color[2]) : "#000000";

    return (
        <div>
            <form>
                Name<br />
                <input type="text" id="box-recipientName" value={box.recipient_name} onChange={onRecipientNameChange} />

                <br />Weight<br/ >
                <input type="text" id="box-weight" value={box.weight} onChange={onBoxWeightChange}/>

                <br />Box color<br />
                <input type="text" id="box-color" value={box.color} onChange={onColorChange} />
                <span style={{ color: boxColorHex }} >X</span>

                <br />Country<br />
                <input type="text" id="box-destinationCountry" value={box.destination_country} onChange={onDestinationCountryChange}/>

                <br />
                <input type="submit" value="Save" />
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      box: state
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onRecipientNameChange: e => {
            dispatch({type: "SET_RECIPIENT_NAME", name: e.target.value})
        },

        onBoxWeightChange: e => {
            dispatch({type: "SET_WEIGHT", weight: e.target.value})
        },

        onColorChange: e => {
            dispatch({type: "SET_BOX_COLOR", color: e.target.value})
        },

        onDestinationCountryChange: e => {
            dispatch({type: "SET_DESTINATION_COUNTRY", name: e.target.value})
        }
    }
  }

const ConnectedBoxForm = connect(mapStateToProps, mapDispatchToProps)(BoxForm)
export { BoxForm as UnconnectedBoxForm };
export default ConnectedBoxForm;