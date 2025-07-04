import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
    type?: 'success' | 'danger' | 'primary' | 'warning' | 'default';
    label?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};

function Button({ type = 'default', label = '', onClick, disabled = false }: ButtonProps) {
    const typeClass = {
        success: 'bg-green-500 hover:bg-green-600',
        danger: 'bg-red-500 hover:bg-red-600',
        primary: 'bg-blue-500 hover:bg-blue-600',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-black',
        default: 'bg-gray-500 hover:bg-gray-600',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    return (
        <button
            onClick={handleClick}
            className={classNames(
                'rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-all duration-200',
                typeClass[type],
                {
                    'cursor-not-allowed opacity-50': disabled,
                    'cursor-pointer': !disabled,
                },
            )}
        >
            {label}
        </button>
    );
}

export default Button;
