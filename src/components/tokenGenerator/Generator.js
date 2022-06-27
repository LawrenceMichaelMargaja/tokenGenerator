import React, {useState} from 'react';
import { ResponsiveContainer } from 'recharts';
import Title from './Title';
import {Button, Card, TextField} from "@mui/material";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTokenValue, setPreviousTokenValues} from "../../store/actions/tokenGenerator";
import {size} from "lodash";

export default function Generator() {

    const dispatch = useDispatch()
    const currentTokenValue = useSelector(state => state.tokenGenerator.currentTokenValue)
    const thePreviousTokens = useSelector(state => state.tokenGenerator.previousTokenValues)

    const [tempToken, setTempToken] = useState('123')

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const addToken = () => {
        if (size(thePreviousTokens) === 0) {
            let initialPreviousToken = {}
            initialPreviousToken[0] = {
                id: 1,
                tokenName: tempToken,
                createdAt: today + ' - ' + new Date().toLocaleTimeString(),
                revoked: false,
                expired: false
            }
            dispatch(setPreviousTokenValues(initialPreviousToken))
        } else {
            const newPreviousTokenIndex = size(thePreviousTokens)
            const currentPreviousTokens = {...thePreviousTokens}

            currentPreviousTokens[newPreviousTokenIndex] = {
                id: size(thePreviousTokens) + 1,
                tokenName: tempToken,
                createdAt: today + ' - ' + new Date().toLocaleTimeString(),
                revoked: false,
                expired: false
            }
            dispatch(setPreviousTokenValues(currentPreviousTokens))
        }
    }

    const generateToken = () => {
        alert("the target === " + tempToken);
        // dispatch(setCurrentTokenValue(tempToken))
        dispatch(setPreviousTokenValues(tempToken))
        // console.log("the new previous token --- ", JSON.stringify(thePreviousToken));
        // axios.get('http://localhost')
        //     .then(res => dispatch(setCurrentTokenValue(res.data)))
        //     .then(res => dispatch(setPreviousTokenValues(res.data)))
        //     .catch(err => alert("No Tokens Yet."))
    }

    return (
        <React.Fragment>
            <Title style={{fontWeight: 'bold'}}>Token Generator</Title>
            <ResponsiveContainer>
                <div style={{width: '100%'}}>
                    <TextField
                        style={{
                            width: '80%'
                        }}
                        onChange={(e) => setTempToken(e.target.value)}
                    />
                    <Button variant='contained'
                        style={{padding: '1em', width: '20%', fontWeight: 'bold'}}
                            onClick={addToken}
                    >
                        Generate
                    </Button>
                </div>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
