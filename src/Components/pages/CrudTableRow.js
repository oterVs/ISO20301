const CrudTableRow = (el) => {
    console.log(el);
    let {apellidos, nombreUsuario,nombres,password } = el.el;
    let rol = "s";
    return (
        <tr>
        <td>{nombres}</td>
        <td>{apellidos}</td>
        <td>{nombreUsuario}</td>
        <td>{password}</td>
        <td>{rol}</td>
        
      </tr>
    )
}

export default CrudTableRow
