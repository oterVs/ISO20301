import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import MuiAlert from "@material-ui/lab/Alert";
import CrudTableRow from "./CrudTableRow";
const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "code", label: "Apellidos", minWidth: 170 },
    {
      id: "population",
      label: "Usuario",
      minWidth: 80,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Contraseña",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Rol",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(name, code, population, size, density) {
 
    return { name, code, population, size, density };
  }
 

  const rows = [
    createData("India", "IN", 1324171354, 3287263),
  
  ];
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });

const Tables = (data) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
 

    useEffect(() => {
      console.log("entro")
      console.log(data);
      
    }, [])

    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
    return (
        <div>
         
         
          <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Rol</th> 
                        <th>Usuario</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.length === 0 ? <tr colSpan="3"><td>Sin datos</td></tr>:data.data.map(el => 
                        <CrudTableRow key={el.id} el={el} 
                        ></CrudTableRow>)}
                </tbody>
            </table>
        </div>
    )
}

export default Tables
