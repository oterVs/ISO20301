import React, {useEffect} from "react";


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const PreguntaUsuario = ({id,calif, handleAnswer,Pregunta }) => {

  const [value, setValue] = React.useState(`${calif}`);
  
  const handleChange = (event) => {
    
    setValue(event.target.value);

  };


  useEffect(() => {
    handleAnswer(id, value);
  }, [value])

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


  

  return (
    <div>
      <p>{Pregunta}</p>  
      <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="0" control={<Radio />} label="0" />
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
       
      </RadioGroup>
    </FormControl>
    </div>
  );
};

export default PreguntaUsuario;
