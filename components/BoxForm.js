import React from 'react';
import { connect } from 'react-redux';
import {rgb2hex } from '@swiftcarrot/color-fns';

const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onDestinationCountryChange, onSave}) => {

    const boxColorHex = box.color != undefined && box.color.length == 3 ? rgb2hex(box.color[0], box.color[1], box.color[2]) : "#000000";

    return (
        <div>
            <form>
                Name<br />
                <input type="text" id="box-recipientName" value={box.recipient_name} onChange={onRecipientNameChange}
                    className={ box.recipient_name != undefined && box.recipient_name.error != undefined ?  "box-form-error" : "box-form-valid"}
                />
                <span> {box.recipient_name && box.recipient_name.error} </span>

                <br />Weight <br />
                <input type="text" id="box-weight" value={box.weight} onChange={onBoxWeightChange}
                    className={ box.weight != undefined && box.weight.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <span> {box.weight && box.weight.error} </span>

                <br />Box color<br />
                <input type="text" id="box-color" value={box.color} onChange={onColorChange}
                    className={ box.color != undefined && box.color.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <span style={{ color: boxColorHex }} >X</span>
                <span> {box.color && box.color.error} </span>

                <br />Country<br />
                <input type="text" id="box-destinationCountry" value={box.destination_country} onChange={onDestinationCountryChange}
                    className={ box.destination_country != undefined && box.destination_country.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <span> {box.destination_country && box.destination_country.error} </span>

                <br />
                <input type="submit" id="box-save" value="Save" onClick={onSave} />
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      box: state.newbox
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
        },

        dispatch: dispatch
    }
  }

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSave: e => {
        e.preventDefault();
        return fetch('/api/box', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stateProps.box)
        })
        .then(response => response.json())
        .then(json => dispatchProps.dispatch({type: "SAVE_SUCCESS", response: json}));
    }}
}

const ConnectedBoxForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(BoxForm)
export { BoxForm as UnconnectedBoxForm };
export default ConnectedBoxForm;