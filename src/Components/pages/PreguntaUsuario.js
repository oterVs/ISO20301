import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PreguntaUsuario = ({id,calif, handleAnswer,Pregunta }) => {
  const [selectedValue, setSelectedValue] = React.useState(calif);


  const transform = (op, val) =>{
    let valor;
    if(op){
      switch(val){
        case 1:
          valor = "a"
          break;
        case 2:
            valor = "b"
            break; 
        case 3:
            valor = "c"
            break;
        case 4:
          valor = "d"
          break;
        case 5:
          valor = "e";
          break;
        default:
          valor = "a";  
      }
    }else {
      switch(val){
        case 'a':
          valor = 1
          break;
        case 'b':
            valor = 2
            break; 
        case 'c':
            valor = 3
            break;
        case 'd':
          valor = 4
          break;
        case 'e':
          valor = 5;
          break;
        default:
          valor = 1;  
      }
    }
    return valor;
  }


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleAnswer(id,transform(false,selectedValue));
  };

  return (
    <div>
      <h3>{Pregunta}</h3>  
      <Radio
        checked={selectedValue === "a"}
        onChange={handleChange}
        value="a"
        name="radio-button-demo"
        inputProps={{ "aria-label": "A" }}
      />
      <Radio
        checked={selectedValue === "b"}
        onChange={handleChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ "aria-label": "B" }}
      />
      <GreenRadio
        checked={selectedValue === "c"}
        onChange={handleChange}
        value="c"
        name="radio-button-demo"
        inputProps={{ "aria-label": "C" }}
      />
      <Radio
        checked={selectedValue === "d"}
        onChange={handleChange}
        value="d"
        color="default"
        name="radio-button-demo"
        inputProps={{ "aria-label": "D" }}
      />
      <Radio
        checked={selectedValue === "e"}
        onChange={handleChange}
        value="e"
        color="default"
        name="radio-button-demo"
        inputProps={{ "aria-label": "E" }}
        size="small"
      />
    </div>
  );
};

export default PreguntaUsuario;
