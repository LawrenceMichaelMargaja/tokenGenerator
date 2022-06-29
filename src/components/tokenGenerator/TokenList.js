import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Button, MenuItem, Select} from "@mui/material";
import {mapKeys} from "lodash";
import {
    setRevokedValue,
    setTokenToBeValidated,
    setTokenToBeValidatedId,
    setTokenToBeValidatedToken
} from "../../store/actions/tokenGenerator";
import {renderBooleanCell} from "@mui/x-data-grid/components/cell/GridBooleanCell";
import axios from "axios";
import instance from "../../axios/axios-intance";

const TokenList = () => {

    const dispatch = useDispatch()

    const previousTokenValues = useSelector(state => state.tokenGenerator.previousTokenValues)
    const data = useSelector(state => state.tokenGenerator.data)
    const tokenId = useSelector(state => state.tokenGenerator.tokenToBeValidated.id)

    const newPreviousTokens = []
    const tokenDetails = []

    for (let index in previousTokenValues) {
        newPreviousTokens.push(previousTokenValues[index])
    }

    for(let index in data) {
        tokenDetails.push(data[index])
    }

    // alert("The tokenDetails === " + JSON.stringify(tokenDetails));

    // console.log("the tokenDetails === ", tokenDetails);

    const displayRows = () => {
        let id = 1
        const newTokens = tokenDetails.map((data) => ({
            id: id++,
            previousTokens: data.key,
            createdAt: data.created_at,
            expired: data.expires_at >= Date.now() ? true : false,
            revoked: data.revoked
        }))
        return (
            newTokens
        )
    }

    const revokeToken = (modelIndex, modelToken) => {
        if(!data[modelIndex].revoked) {
            const proceed = window.confirm("Are you sure you want to revoke this token?")
            if (proceed && !data[modelIndex].revoked) {
                instance.delete(`/api/v0/token/${modelToken}/revoke`)
                    .then(response => console.log("THE RESPOSE FROM PUT === ", response))
                    .then(() => dispatch(setRevokedValue(true, modelIndex)))
                    .catch(err => console.log(err))
            }
        } else {
            alert("Token is already revoked.");
            return
        }
    }

    const columns = [
        {
            field: 'previousTokens',
            headerName: 'TOKEN KEYS',
            headerAlign: 'center',
            placeholder: 'test',
            editable: false,
            flex: 1
        },
        {
            field: 'createdAt',
            headerName: 'CREATED AT',
            headerAlign: 'center',
            placeholder: 'test',
            editable: false,
            flex: 1
        },
        {
            field: 'revoked',
            // width: 150,
            headerName: 'REVOKED',
            headerAlign: 'center',
            placeholder: 'test',
            editable: false,
            flex: 1,
        },
        {
            field: 'expired',
            headerName: 'EXPIRED',
            headerAlign: 'center',
            placeholder: 'test',
            editable: false,
            flex: 1
        },
        {
            field: 'action',
            width: 150,
            headerName: 'ACTION',
            headerAlign: 'center',
            placeholder: 'test',
            editable: false,
            type: "boolean",
            // flex: 1,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#a32929', fontWeight: 'bold', display: params.row.revoked === false ? 'block' : "none"}}
                    >
                        REVOKE
                    </Button>
                );
            }
        },
    ];

    return (
        <div style={{height: '400px'}}>
            <DataGrid
                sx={{
                    width: '100%',
                    // height: '400px',
                    flexGrow: 1,
                    margin: '0 auto',
                    boxShadow: 2,
                    border: 1,
                    // overFlow: 'hidden',
                    color: '#000',
                    justifyContent: 'center',
                    borderColor: 'primary.dark',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'gray',
                        color: '#fff',
                        justifyContent: 'center',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold'
                    },
                    '& .MuiDataGrid-cell': {
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    },
                    '& .css-1pans1z-MuiDataGrid-virtualScroller': {
                        overflow: 'overlay'
                    },
                    '& .MuiSvgIcon-root': {
                        opacity: 100,
                        fontWeight: 'bold',
                        fill: "#fff" // or whatever you need
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#e1e1e1'
                    },
                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: '#fff'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: '#fff'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'gray'
                    },
                    '& .MuiTablePagination-displayedRows': {
                        color: '#fff'
                    },
                    '& .MuiBox-root': {
                        width: '100%'
                    },
                    '& .MuiOutlinedInput-root': {
                        width: '100%'
                    },
                    '& .MuiSelect-iconOutlined': {
                        fill: '#000'
                    },
                    '& .MuiDataGrid-selectedRowCount': {
                        color: '#fff'
                    }
                }}
                on
                onCellClick={(model) => {
                    // console.log("the model from cell click --- ", JSON.stringify(model));
                    let modelIndex = null
                    for (let index in model) {
                        modelIndex = parseFloat(model.id)
                    }
                    if (model.field === 'action') {
                        // console.log(parseFloat(modelIndex) - 1);
                        revokeToken(parseFloat(modelIndex) - 1, model.row.previousTokens)
                        dispatch(setTokenToBeValidatedId(parseFloat(modelIndex) - 1))

                    } else if(model.field === 'previousTokens') {
                        // alert("the model === " + JSON.stringify(model.value));
                        dispatch(setTokenToBeValidatedToken(model.value))
                        dispatch(setTokenToBeValidatedId(parseFloat(modelIndex) - 1))
                    } else {
                        dispatch(setTokenToBeValidatedId(parseFloat(modelIndex) - 1))
                        return
                    }
                }}
                pageSize={10}
                // rowsPerPageOptions={[4]}
                columns={columns}
                rows={displayRows()}
            />
        </div>
    )
}
export default TokenList
