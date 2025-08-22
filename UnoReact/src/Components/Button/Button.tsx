import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    width?: string;
    size: 'sm' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<Props> = (props) => {
    const classes = buildClasses(props);

    return (
        <button
            className={`${classes} border-cyan-500 hover:bg-cyan-500 hover:text-black rounded cursor-pointer
             disabled:bg-gray-600 disabled:border-none disabled:text-white disabled:cursor-not-allowed`}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

const buildClasses = (props: Props) => {
    const sizeClass = {
        sm: 'p-1 border-1',
        lg: 'px-4 py-2 border-2',
    };
    return `${props.width ? 'w-' + props.width : 'w-auto'} ${sizeClass[props.size]}`;
};
