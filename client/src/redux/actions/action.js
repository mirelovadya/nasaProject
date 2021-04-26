
export const SET_NAME = 'SET_NAME'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_PICTURES = 'SET_PICTURES'


export function setName(name) {
    console.log(`name ${name}`);
    return {
        type: SET_NAME,
        payload: name
    }
}
export function setEmail(email) {
    console.log(`email ${email}`);
    return {
        type: SET_EMAIL,
        payload: email
    }
}
export function setPassword(password) {
    console.log(`password ${password}`);
    return {
        type: SET_PASSWORD,
        payload: password
    }
}
export function setPictures(pictures) {
    console.log(`pictures ${pictures}`);
    return {
        type: SET_PICTURES,
        payload: pictures
    }
}
