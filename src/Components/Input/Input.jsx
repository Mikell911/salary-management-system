import React from 'react';
import './input.scss';

const Input = ({ label, id, type = 'text', value, onChange, maxWidth }) => {
    return (
        <div className={'input-row relative w-full max-w-80 mt-2.5'} style={{ maxWidth }}>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={'input-row__input'}
                required={true}
                style={{ maxWidth: '100%' }}
            />
            <label htmlFor={id} className={'input-row__label absolute top-2.5 left-3.5 text-blue-500 max-sm:text-sm'}>
                {label}
            </label>
            <span className={'input-row__bar'}></span>
        </div>
    );
};

export default Input;