import React, {useEffect, useState} from 'react';
import {ResponsiveContainer} from 'recharts';
import Title from './Title';
import {Button, Card, TextField} from "@mui/material";
import axios from "../../axios/axios-intance";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTokenValue, setDataValue, setPreviousTokenValues} from "../../store/actions/tokenGenerator";
import {size} from "lodash";
import instance from "../../axios/axios-intance";

export default function Generator() {

    const dispatch = useDispatch()
    const currentTokenValue = useSelector(state => state.tokenGenerator.currentTokenValue)
    const data = useSelector(state => state.tokenGenerator.data)
    const thePreviousTokens = useSelector(state => state.tokenGenerator.previousTokenValues)

    const [tempToken, setTempToken] = useState('123')

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    // useEffect(() => {
    //     alert("Hey I changed === " + JSON.stringify(data));
    // }, [data])

    today = mm + '/' + dd + '/' + yyyy;

    const addToken = () => {
        instance.post('/api/v0/token')
            .then(response => dispatch(setCurrentTokenValue(response.data)))
            .then(response => instance.get('/api/v0/token')
                // .then(response => console.log("the data we got. --- ", response))
                // .then(response => console.log("the data we got 2222. --- ", response.data[0].created_at))
                .then(response => {
                    dispatch(setDataValue(response.data))
                    // if (size(data) === 0) {
                    //     const newTokenDetails = {}
                    //     newTokenDetails[0] = {
                    //         id: response.data[0].id,
                    //         createdAt: response.data[0].created_at,
                    //         createdBy: response.data[0].created_by,
                    //         expiresAt: response.data[0].expires_at,
                    //         dataKey: response.data[0].key,
                    //         revoked: response.data[0].revoked
                    //     }
                    //     dispatch(setDataValue(newTokenDetails))
                    // } else {
                    //     const newTokenDetailsIndex = size(data)
                    //     const currentData = {...data}
                    //
                    //     currentData[newTokenDetailsIndex] = {
                    //         id: response.data[newTokenDetailsIndex].id,
                    //         createdAt: response.data[newTokenDetailsIndex].created_at,
                    //         createdBy: response.data[newTokenDetailsIndex].created_by,
                    //         expiresAt: response.data[newTokenDetailsIndex].expires_at,
                    //         dataKey: response.data[newTokenDetailsIndex].key,
                    //         revoked: response.data[newTokenDetailsIndex].revoked
                    //     }
                    //     dispatch(setDataValue(currentData))
                    // }
                })
                .catch(err => console.log(err))
            )
            .catch(error => console.log(error))
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
                        value={currentTokenValue}
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
