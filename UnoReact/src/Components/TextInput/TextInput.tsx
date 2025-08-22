interface Props {
    label: string;
    placeholder?: string;
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export const TextInput: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1 text-yellow-400">
                {props.label}
            </label>
            <input
                type="text"
                disabled={props.disabled}
                value={props.value}
                placeholder="Enter the game id"
                onChange={(e) => props.onChange(e.target.value)}
                className="w-96 border border-yellow-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-700"
            />
        </div>
    );
};
