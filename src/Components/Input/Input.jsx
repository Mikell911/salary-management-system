import React from 'react';
import './input.scss';

const Input = ({ label, id, type = 'text', value, onChange, maxWidth }) => {
    return (
        <div className={'input-row'} style={{ maxWidth }}>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={'input-row__input'}
                required={true}
                style={{ maxWidth: '100%' }}
            />
            <label htmlFor={id} className={'input-row__label'}>
                {label}
            </label>
            <span className={'input-row__bar'}></span>
        </div>
    );
};

export default Input;