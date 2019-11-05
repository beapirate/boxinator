const boxes = (state = [], action) => {
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

      return [...state, defaultbox]
  }

  return state
}

export default boxes;
