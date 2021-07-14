import React, {useEffect} from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const PreguntaUsuario = ({id,calif, handleAnswer, num, Pregunta }) => {

  const [value, setValue] = React.useState(`${calif}`);
  
  const handleChange = (event) => {
    
    setValue(event.target.value);

  };


  useEffect(() => {
    handleAnswer(id, value);
  }, [value])



  return (
    <div>
      <p><strong>{num}</strong> {Pregunta}</p>  
      <FormControl component="fieldset">
      
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="0" style={{display:"none"}} control={<Radio />} label="0" />
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
