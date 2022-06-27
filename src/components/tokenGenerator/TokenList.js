import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Button, MenuItem, Select} from "@mui/material";
import {mapKeys} from "lodash";
import {setRevokedValue} from "../../store/actions/tokenGenerator";
import {renderBooleanCell} from "@mui/x-data-grid/components/cell/GridBooleanCell";

const TokenList = () => {

    const dispatch = useDispatch()

    const previousTokenValues = useSelector(state => state.tokenGenerator.previousTokenValues)

    const newPreviousTokens = []

    for (let index in previousTokenValues) {
        newPreviousTokens.push(previousTokenValues[index])
    }

    const displayRows = () => {
        let id = 1
        const newTokens = newPreviousTokens.map((data) => ({
            id: id++,
            previousTokens: data.tokenName,
            createdAt: data.createdAt,
            revoked: data.revoked,
            expired: data.expired
        }))
        return (
            newTokens
        )
    }

    const revokeToken = (modelIndex, model) => {
        if(!previousTokenValues[modelIndex].revoked) {
            const proceed = window.confirm("Are you sure you want to revoke this token?")
            alert("the model index --- " + JSON.stringify(modelIndex));
            if (proceed && !previousTokenValues[modelIndex].revoked) {
                let newNumber = 0
                const objectMapper = (object) => {
                    let newObj = mapKeys(object, (value, key) => newNumber++)
                    return newObj
                }
                dispatch(setRevokedValue(true, modelIndex))
            }
        } else {
            alert("Token is already revoked.");
            return
        }

    }

    const columns = [
        {
            field: 'previousTokens',
            headerName: 'PREVIOUS TOKENS',
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
                console.log("the params === ", params);
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
        <div style={{height: '500px'}}>
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
                        revokeToken(parseFloat(modelIndex) - 1, model)

                    } else {
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
