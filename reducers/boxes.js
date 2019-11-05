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
    default:
        return state
  }
}

export default boxes;
