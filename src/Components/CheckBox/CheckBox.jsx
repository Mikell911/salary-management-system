import './checkbox.scss'
import {useState} from "react";

const CheckBox = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChangeChecked = () => {
        const updatedChecked = !isChecked;
        setIsChecked(updatedChecked);
        props.checkInput(updatedChecked);
        props.checkedInput(updatedChecked)
    };

  return (
      <div className={'check-box-row'}>
          <input type="checkbox" id={props.id} className={'check-box-row__input'}
                 checked={isChecked}
                 onChange={handleChangeChecked}/>
          <label htmlFor={props.id} className={'check-box-row__label'}>
              {props.label}
          </label>
      </div>
  )
}

export default CheckBox;