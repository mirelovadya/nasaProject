import {  SET_NAME, SET_EMAIL, SET_PASSWORD, SET_PICTURES } from '../actions/action'

const initialState = {
    // user: {
        name: "",
        email: "",
        password: "",
        pictures: []
    // }
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case SET_NAME:
           
            console.log(`hi ${state.name}`);
            return { ...state, name: action.payload };

        case SET_EMAIL:
            // state.email = action.payload;
            
            console.log(`hi ${state.email}`);
            return { ...state, email: action.payload };

            // break;

        case SET_PASSWORD:
            // state.password = action.payload;
            console.log(`hi ${state.password}`);
            return { ...state, password: action.payload };

            // break;

        case SET_PICTURES:
            return { ...state, pictures: action.payload };

            // state.pictures = action.payload;
            // break;



        default:
            return state;
    }
}