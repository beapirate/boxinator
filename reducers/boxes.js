import { isNumber } from "util";

const isValidDestinationCountry = (name) => {
  const valid = [
    "Australia",
    "Brazil",
    "China",
    "Sweden"
  ].map(i => i.toLowerCase());
  return valid.indexOf(name.toLowerCase()) > -1;
}

const boxes = (state = undefined, action) => {
  switch(action.type) {
    case 'CREATE_NEW_BOX':
      var defaultbox = {};
      defaultbox. recipient_name = new String("");
      defaultbox.recipient_name.error = "required";

      defaultbox.weight = new String("0.0");
      defaultbox.weight.error = "required";

      defaultbox.destination_country = new String("");
      defaultbox.destination_country.error = "required";

      defaultbox.color = new String("");
      defaultbox.color.error = "required";

      return defaultbox;

    case 'SET_RECIPIENT_NAME':
      var recipient_name = new String(action.name.trim());
      if(!recipient_name.toString()) {
        recipient_name.error = "required";
      }
      return {...state, recipient_name: recipient_name};

    case 'SET_DESTINATION_COUNTRY':
        var destination_country = new String(action.name.trim());
        if(!destination_country.toString()) {
          destination_country.error = "required";
        }
        else if(!isValidDestinationCountry(destination_country.toString())) {
          destination_country.error = "invalid";
        }
        return {...state, destination_country: destination_country};

    case 'SET_WEIGHT':
      var weight = new String(action.weight.trim());
      if(!weight.toString()) {
        weight.error = "required";
      }

      if(!/^-?\d+([\.,]\d+)?$/.test(weight)) {
        weight.error = "invalid";
      }

      var decimalfixed = weight.replace(",", ".");
      var num = Number.parseFloat(decimalfixed.toString());
      if(Number.isNaN(num)) {
        weight.error = "invalid"
      }

      if(num < 0) {
        weight.error  = "negative";
      }

      weight.numeric = num;
      return {...state, weight: weight};

    case 'SET_BOX_COLOR':
      var color = action.color;

      if(!Array.isArray(color)) {
        color.error = "invalid";
      }
      else if(color.length != 3) {
        color.error = "invalid";
      }
      else if(!color.every(i => i > -1 && i < 256)) {
        color.error = "invalid";
      }
      return {...state, color: color};

    default:
        return state
  }
}

export default boxes;
