
const boxes = (state, action) => {

    if(state == undefined) {
        state = [];
    }

    switch(action.type) {
        case "SAVE_SUCCESS":
            return [...state, action.response];

        case "LOAD_SUCCESS":
            return [...action.response];

        default:
            return state;
    }
};

export default boxes;