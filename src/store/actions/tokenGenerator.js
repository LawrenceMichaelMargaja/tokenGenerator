import {
    SET_CURRENT_TOKEN_VALUE, SET_DATA_VALUE,
    SET_EXPIRED_VALUE,
    SET_PREVIOUS_TOKEN_VALUE,
    SET_REVOKED_VALUE, SET_TOKEN_TO_BE_VALIDATED
} from "./actionTypes";

export const setDataValue = (data) => {
    return {
        type: SET_DATA_VALUE,
        payload: data
    }
}

export const setCurrentTokenValue = (data) => {
    return {
        type: SET_CURRENT_TOKEN_VALUE,
        payload: data
    }
}

export const setPreviousTokenValues = (data) => {
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

export const setTokenToBeValidated = (data) => {
    return {
        type: SET_TOKEN_TO_BE_VALIDATED,
        payload: data
    }
}

export const setExpiredValue = (data, tokenIndex) => {
    return {
        type: SET_EXPIRED_VALUE,
        payload: {data: data, tokenIndex: tokenIndex}
    }
}
