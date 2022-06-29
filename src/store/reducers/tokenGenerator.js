import {
    SET_CURRENT_TOKEN_VALUE, SET_DATA_VALUE,
    SET_EXPIRED_VALUE,
    SET_PREVIOUS_TOKEN_VALUE,
    SET_REVOKED_VALUE
} from "../actions/actionTypes";

const initialState = {
    currentTokenValue: [],
    previousTokenValues: [],
    data: {}
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_TOKEN_VALUE:
            return setCurrentTokenValue(state, action.payload)
        case SET_PREVIOUS_TOKEN_VALUE:
            return setPreviousTokenValues(state, action.payload)
        case SET_REVOKED_VALUE:
            return setRevokedValue(state, action.payload)
        case SET_EXPIRED_VALUE:
            return setExpiredValue(state, action.payload)
        case SET_DATA_VALUE:
            return setDataValue(state, action.payload)
        default:
            return state
    }
}

const setDataValue = (state, payload) => {
    return {
        ...state,
        data: payload
    }
}

const setCurrentTokenValue = (state, payload) => {
    // alert("also the data === " + JSON.stringify(payload));
    return {
        ...state,
        currentTokenValue: payload
    }
}

const setPreviousTokenValues = (state, payload) => {
    // alert("also the previous data === " + JSON.stringify(payload));
    return {
        ...state,
        previousTokenValues: payload
    }
}

const setRevokedValue = (state, payload) => {
    alert("The paylaod === " + JSON.stringify(state.data));
    return {
        ...state,
        data: {
            ...state.data,
            [payload.tokenIndex]: {
                ...state.data[payload.tokenIndex],
                revoked: payload.data
            }
        }
    }
}

const setExpiredValue = (state, payload) => {
    return {
        ...state,
        previousTokenValues: {
            ...state.previousTokenValues,
            [payload.tokenIndex]: {
                ...state.previousTokenValues[payload.tokenIndex],
                expired: payload.data
            }
        }
    }
}

export default Reducer
