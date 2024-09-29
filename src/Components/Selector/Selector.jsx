import './selector.scss';
import { useState, useEffect } from 'react';

const Selector = (props) => {
    const [value, setValue] = useState(props.value || 'Wybrać');
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
        <div className={'selector-row py-2.5 max-w-28 w-28 relative text-center'}>
            <p className={'text-xs text-left text-gray-400'}>{props.title}</p>
            <div
                className={`selector-row__button w-full border-b border-b-blue-500 cursor-pointer p-1 text-blue-500 
                text-sm hover:text-white hover:bg-blue-500
                ${open ? 'bg-blue-500 text-white' : ''} `}
                onClick={onButton}>
                {value}
            </div>

            {open && (
                <div className={'selector-row__content w-full border-b border-b-blue-500 absolute cursor-pointer z-10 max-h-44 text-sm overflow-auto'}>
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
