const Button = ({ onClick, label, type = 'button',  disabled = false }) => {
    return (
        <button
            className={'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border ' +
                'border-blue-500 hover:border-transparent rounded max-sm:px-2 max-sm:py-1 max-sm:text-base'}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
