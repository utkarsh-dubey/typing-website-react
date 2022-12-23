import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../Context/ThemeContext'

const ResultTable = ({data}) => {

    const {theme} = useTheme();
  return (
    <div className='table'>
        <TableContainer style={{maxHeight:'30rem'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            WPM
                        </TableCell >
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Accuracy
                        </TableCell>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Characters
                        </TableCell>
                        <TableCell style={{color: theme.title, textAlign: 'center'}}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((i)=>(
                            <TableRow>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.wpm}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.characters}
                                </TableCell>
                                <TableCell style={{color: theme.title, textAlign: 'center' }}>
                                    {i.timeStamp.toDate().toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default ResultTable