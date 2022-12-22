import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const ResultTable = ({data}) => {
  return (
    <div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            WPM
                        </TableCell>
                        <TableCell>
                            Accuracy
                        </TableCell>
                        <TableCell>
                            Characters
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((i)=>(
                            <TableRow>
                                <TableCell>
                                    {i.wpm}
                                </TableCell>
                                <TableCell>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell>
                                    {i.characters}
                                </TableCell>
                                <TableCell>
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