import React from 'react';
import { connect } from 'react-redux';
import {rgb2hex } from '@swiftcarrot/color-fns';

const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onDestinationCountryChange}) => {

    const boxColorHex = box.color != undefined && box.color.length == 3 ? rgb2hex(box.color[0], box.color[1], box.color[2]) : "#000000";

    return (
        <div>
            <form>
                Name<br />
                <input type="text" id="box-recipientName" value={box.recipient_name} onChange={onRecipientNameChange}
                    className={ box.recipient_name != undefined && box.recipient_name.error != undefined ?  "box-form-error" : "box-form-valid"}
                />

                <br />Weight <br />
                <input type="text" id="box-weight" value={box.weight} onChange={onBoxWeightChange}
                    className={ box.weight != undefined && box.weight.error != undefined ? "box-form-error" : "box-form-valid" }
                />

                <br />Box color<br />
                <input type="text" id="box-color" value={box.color} onChange={onColorChange}
                    className={ box.color != undefined && box.color.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <span style={{ color: boxColorHex }} >X</span>

                <br />Country<br />
                <input type="text" id="box-destinationCountry" value={box.destination_country} onChange={onDestinationCountryChange}
                    className={ box.destination_country != undefined && box.destination_country.error != undefined ? "box-form-error" : "box-form-valid" }
                />

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