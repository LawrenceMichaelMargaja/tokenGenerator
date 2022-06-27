import {SET_CURRENT_TOKEN_VALUE, SET_EXPIRED_VALUE, SET_PREVIOUS_TOKEN_VALUE, SET_REVOKED_VALUE} from "./actionTypes";

export const setCurrentTokenValue = (data) => {
    // alert("here's the data === " + JSON.stringify(data));
    return {
        type: SET_CURRENT_TOKEN_VALUE,
        payload: data
    }
}

export const setPreviousTokenValues = (data) => {
    // alert("here's the previous data === " + JSON.stringify(data));
    return {
        type: SET_PREVIOUS_TOKEN_VALUE,
        payload: data
    }
}

export const setRevokedValue = (data, tokenIndex) => {
    return {
        type: SET_REVOKED_VALUE,
        payload: {data: data, tokenIndex: tokenIndex}
    }
}

export const setExpiredValue = (data, tokenIndex) => {
    return {
        type: SET_EXPIRED_VALUE,
        payload: {data: data, tokenIndex: tokenIndex}
    }
}
