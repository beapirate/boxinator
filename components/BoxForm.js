import React from 'react';
import { connect } from 'react-redux';

const BoxForm = ({ box, onRecipientNameChange, onBoxWeightChange, onColorChange, onDestinationCountryChange}) => {
    return (
        <div>
            <form>
                Name<br/>
                <input type="text" value={box.recipient_name} onChange={onRecipientNameChange} />

                Weight<br/>
                <input type="text" value={box.weight} onChange={onBoxWeightChange}/>

                Box color<br/>
                <input type="text" value={box.color} onChange={onColorChange} />

                Country<br />
                <input type="text" value={box.destination_country} onChange={onDestinationCountryChange}/>

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
    }
  }

const ConnectedBoxForm = connect(mapStateToProps, mapDispatchToProps)(BoxForm)
export { BoxForm as UnconnectedBoxForm };
export default ConnectedBoxForm;