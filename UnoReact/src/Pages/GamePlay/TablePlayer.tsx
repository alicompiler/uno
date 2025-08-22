export const TablePlayer: React.FC<{ name: string; id: string; isActive: boolean }> = ({ name, isActive }) => {
    return (
        <div className={`p-2 rounded shadow-2xl ${isActive ? 'bg-red-200 text-black' : 'bg-green-200 text-black'}`}>
            <p className="text-sm w-16 max-w-16 overflow-ellipsis text-center text-nowrap overflow-hidden">{name}</p>
        </div>
    );
};
