import { rgb2hsv, hsv2hsl } from '@swiftcarrot/color-fns';
import { isValidDestinationCountry } from "../util/countries.js";


const isBlue = (r, g, b) => {
  // See https://www.w3schools.com/colors/colors_picker.asp
  // Blue range is between 180 and 255 (imo)
  var hsv = rgb2hsv(r, g, b);
  var hsl = hsv2hsl(hsv.h, hsv.s, hsv.v);
  return hsl.h >= 180 && hsl.h <= 255;
}


const createdefaultbox = () => {
  var defaultbox = {};

  defaultbox.saved = false;
  defaultbox.colorPickerVisible = false;

  defaultbox. recipient_name = new String("");
  defaultbox.recipient_name.error = "required";

  defaultbox.weight = new String("0.0");
  defaultbox.weight.error = "required";

  defaultbox.destination_country = new String("");
  defaultbox.destination_country.error = "required";

  defaultbox.color = new String("");
  defaultbox.color.error = "required";

  return defaultbox;
}


const newbox = (state, action) => {

  if(state == undefined) {
    state = createdefaultbox();
  }

  switch(action.type) {
    case 'CREATE_NEW_BOX':
      return createdefaultbox();

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
      else if(isBlue(color[0], color[1], color[2])) {
        color.error = "too blue";
      }

      return {...state, color: color};

    case "TOGGLE_COLOR_PICKER":
      return {...state, colorPickerVisible: !state.colorPickerVisible };

    case "SAVE_ERROR":
      // XXX - if SAVE_ERROR action contains no .error nor any .errors... what type of error is that?
      var response = action.response;
      var next = {...state, error: action.error};

      if(!response) {
        return next;
      }

      for (let i = 0; i < response.errors.length; i++) {
        const validprops = ["recipient_name", "weight", "color", "destination_country"];
        const propname = response.errors[i].property

        if(validprops.indexOf(propname) < 0) {
          console.error("Unknown property " + propname + " when handling SAVE_ERROR action");
          continue;
        }

        var value = new String(next[propname]);
        value.error = response.errors[i].error
        next[propname] = value;
      }

      return next;

    case "SAVE_SUCCESS":
      return {...state, saved: true, error: undefined};

    default:
        return state
  }
}

export default newbox;
