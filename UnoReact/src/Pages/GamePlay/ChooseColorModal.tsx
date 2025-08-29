import { Button } from '../../Components/Button/Button';

interface Props {
    onClose: () => void;
    onSelectColor: (color: 'blue' | 'green' | 'red' | 'yellow') => void;
}

export const ChooseColorModal: React.FC<Props> = ({ onClose, onSelectColor }) => {
    const colors = [
        { name: 'blue', bg: 'bg-blue-500' },
        { name: 'green', bg: 'bg-green-500' },
        { name: 'red', bg: 'bg-red-500' },
        { name: 'yellow', bg: 'bg-yellow-400' },
    ] as const;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
                <h2 className="text-lg font-bold mb-4 text-black">Choose a Color</h2>
                <div className="grid grid-cols-2 gap-4">
                    {colors.map((c) => (
                        <div key={c.name}>
                            <button
                                className={`${c.bg} w-24 h-24 rounded-xl shadow-md text-white font-bold text-lg hover:scale-105 transition-transform`}
                                onClick={() => {
                                    onSelectColor(c.name);
                                    onClose();
                                }}
                            >
                                {c.name.toUpperCase()}
                            </button>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="py-4 text-black">
                    <Button width="full" size="sm" onClick={() => onClose()}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};
