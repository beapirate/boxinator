import React from 'react';
import { connect } from 'react-redux';
import { rgb2hex } from '@swiftcarrot/color-fns';
import { ChromePicker } from 'react-color';
import { saveBoxToApi } from '../actions';


const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onColorClick, onDestinationCountryChange, onSave}) => {

    const boxColorHex = box.color != undefined && box.color.length == 3 ? rgb2hex(box.color[0], box.color[1], box.color[2]) : "#000000";

    const validInputs = (
        box.recipient_name != undefined && box.recipient_name.error == undefined &&
        box.weight != undefined && box.weight.error == undefined &&
        box.color != undefined && box.color.error == undefined &&
        box.destination_country != undefined && box.destination_country.error == undefined 
    );

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
                <div style={{ display: "flex" }}>
                <input type="text" id="box-color" value={boxColorHex} onClick={onColorClick}
                    className={ box.color != undefined && box.color.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <div style={{
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer'
                    }}
                    onClick={ onColorClick }>
                    <div style={{
                         width: '36px',
                         height: '14px',
                         borderRadius: '2px',
                         background: boxColorHex,
                    }} />
                </div>
                <div> {box.color && box.color.error} </div>
                </div>

                { box.colorPickerVisible && <ChromePicker color={boxColorHex} onChange={onColorChange} /> }

                <br />Country<br />
                <input type="text" id="box-destinationCountry" value={box.destination_country} onChange={onDestinationCountryChange}
                    className={ box.destination_country != undefined && box.destination_country.error != undefined ? "box-form-error" : "box-form-valid" }
                />
                <span> {box.destination_country && box.destination_country.error} </span>

                <br />
                <input type="submit" id="box-save" value="Save" disabled={!validInputs} onClick={onSave} />
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

        onColorChange: (color, e) => {
            dispatch({type: "SET_BOX_COLOR", color: [color.rgb.r, color.rgb.g, color.rgb.b]})
        },

        onColorClick: (e) => {
            dispatch({type: "TOGGLE_COLOR_PICKER"})
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
        
        const boxModel = {
            recipient_name: (stateProps.box.recipient_name),
            weight: Number.parseFloat(stateProps.box.weight),
            color: rgb2hex(stateProps.box.color[0], stateProps.box.color[1], stateProps.box.color[2]),
            destination_country: stateProps.box.destination_country
        };

        dispatchProps.dispatch(saveBoxToApi(boxModel));
    }
  }
}

const ConnectedBoxForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(BoxForm)
export { BoxForm as UnconnectedBoxForm };
export default ConnectedBoxForm;