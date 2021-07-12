import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  function createData(name, valor,) {
    return { name, valor,  };
  }
  
  const rows = [
    createData('Desconozco', 1),
    createData('Total en desacuerdo', 2),
    createData('Desacuerdo', 3),
    createData('De acuerdo',4),
    createData('Totalmente de acuerdo', 5),
  ];
const Escala = () => {
    const classes = useStyles();
    return (
    <TableContainer  component={Paper}>
      <Table className={classes.table} size="small"  aria-label="a dense table">
       
        <TableBody>
          {rows.map((row) => (
            <TableRow  key={row.name}>
              <TableCell  >
                {row.name}
              </TableCell>
              <TableCell  align="right">{row.valor}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Escala
