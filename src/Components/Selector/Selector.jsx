import './selector.scss';
import { useState, useEffect } from 'react';

const Selector = (props) => {
    const [value, setValue] = useState(props.value || 'Select one');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    const onElementClicked = (string) => {
        setValue(string);
        setOpen(false);
        if (props.onSelect) {
            props.onSelect(string);
        }
    };

    const onButton = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <div className={'selector-row'}>
            <p className={'selector__title'}>{props.title}</p>
            <div
                className={`selector-row__button ${open ? 'open' : ''}`}
                onClick={onButton}>
                {value}
            </div>

            {open && (
                <div className={'selector-row__content'}>
                    {props.selectebel.map((string) => (
                        <div
                            key={string}
                            onClick={() => onElementClicked(string)}>
                            {string}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Selector;
