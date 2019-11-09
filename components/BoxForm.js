import React from 'react';
import { connect } from 'react-redux';

const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onDestinationCountryChange}) => {
    return (
        <div>
            <form>
                Name<br />
                <input type="text" id="box-recipientName" value={box.recipient_name} onChange={onRecipientNameChange} />

                <br />Weight<br/ >
                <input type="text" id="box-weight" value={box.weight} onChange={onBoxWeightChange}/>

                <br />Box color<br />
                <input type="text" id="box-color" value={box.color} onChange={onColorChange} />

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