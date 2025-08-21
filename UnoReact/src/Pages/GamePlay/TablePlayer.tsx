export const TablePlayer: React.FC<{ name: string; id: string; isActive: boolean }> = ({ name }) => {
    return (
        <div className="bg-black text-white p-2 rounded shadow-2xl">
            <p className="text-sm w-12 max-w-12 overflow-ellipsis text-center text-nowrap overflow-hidden">{name}</p>
        </div>
    );
};
