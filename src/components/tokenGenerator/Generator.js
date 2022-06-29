import React, {useEffect, useState} from 'react';
import {ResponsiveContainer} from 'recharts';
import Title from './Title';
import {Button, Card, TextField} from "@mui/material";
import axios from "../../axios/axios-intance";
import {useDispatch, useSelector} from "react-redux";
import {
    setCurrentTokenValue,
    setDataValue,
    setPreviousTokenValues,
    setTokenToBeValidated, setTokenToBeValidatedToken
} from "../../store/actions/tokenGenerator";
import {size} from "lodash";
import instance from "../../axios/axios-intance";

export default function Generator() {

    const dispatch = useDispatch()
    const currentTokenValue = useSelector(state => state.tokenGenerator.currentTokenValue)
    const data = useSelector(state => state.tokenGenerator.data)
    const thePreviousTokens = useSelector(state => state.tokenGenerator.previousTokenValues)
    const tokenToBeValidated = useSelector(state => state.tokenGenerator.tokenToBeValidated.token)
    const token = useSelector(state => state.tokenGenerator.tokenToBeValidated.token)

    const [validateTokenValue, setValidateTokenValue] = useState('')

    useEffect(() => {
        instance.get('/api/v0/token')
            .then(response => dispatch(setDataValue(response.data)))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        instance.get('/api/v0/token')
            .then(response => dispatch(setDataValue(response.data)))
            .catch(err => console.log(err))
    }, [currentTokenValue])

    const addToken = () => {
        instance.post('/api/v0/token')
            .then(response => dispatch(setCurrentTokenValue(response.data)))
            .catch(error => console.log(error))
    }

    const validateToken = (token) => {
        instance.get(`/api/v0/token/${token}/validate`)
            .then(response => {
                if(response.data) {
                    alert('Token is validated!')
                }
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data))
            })
    }

    return (
        <React.Fragment>
            <Title style={{fontWeight: 'bold'}}>Token Generator</Title>
            <ResponsiveContainer>
                <>
                    <div style={{width: '100%'}}>
                        <TextField
                            style={{
                                width: '80%'
                            }}
                            value={currentTokenValue}
                        />
                        <Button variant='contained'
                                style={{padding: '1em', width: '20%', fontWeight: 'bold'}}
                                onClick={addToken}
                        >
                            Generate
                        </Button>
                    </div>
                    <div style={{width: '100%', marginTop: '10px'}}>
                        <TextField
                            style={{
                                width: '80%'
                            }}
                            // disabled={true}
                            placeholder={"Please click one of the 'Token Keys'"}
                            value={tokenToBeValidated}
                            onChange={(e) => {
                                const val = e.target.value
                                dispatch(setTokenToBeValidatedToken(val))
                            }}
                        />
                        <Button variant='contained'
                                style={{padding: '1em', width: '20%', fontWeight: 'bold', backgroundColor: 'green'}}
                                onClick={() => validateToken(token)}
                        >
                            Validate
                        </Button>
                    </div>
                </>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
