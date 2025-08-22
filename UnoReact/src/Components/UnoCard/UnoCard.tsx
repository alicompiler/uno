import type { UnoCard, CardColor, CardValue } from '../../Domain/Card/UnoCard';

export const UnoCardComponent: React.FC<{ card: UnoCard; width: number; height: number }> = ({
    card,
    width,
    height,
}) => {
    const background = getBackground(card.isWild ? 'wild' : card.color);

    return (
        <div
            className={`flex items-center justify-center flex-col rounded ${background} text-white p-2`}
            style={{
                width,
                height,
            }}
        >
            <div className="flex items-start justify-start w-full">
                {card.value !== undefined ? <CardTopBottom value={card.value} /> : <p className="text-lg">W</p>}
            </div>
            <div className="flex-1">
                <div className="rotate-12 w-[80px] h-[120px] rounded-full bg-white flex items-center justify-center text-black">
                    <div className="text-center">
                        {card.value !== undefined ? <CardCenter value={card.value} /> : 'Wild'}
                    </div>
                </div>
            </div>
            <div className="flex items-start justify-end w-full">
                {card.value !== undefined ? <CardTopBottom value={card.value} /> : <p className="text-lg">W</p>}
            </div>
        </div>
    );
};

const getBackground = (type: CardColor | 'wild'): string => {
    switch (type) {
        case 'blue':
            return 'bg-blue-500';
        case 'green':
            return 'bg-green-500';
        case 'red':
            return 'bg-red-500';
        case 'yellow':
            return 'bg-yellow-500';
        case 'wild':
            return 'bg-black';
        default:
            throw Error('cannot return background for type: ' + type);
    }
};

const CardCenter: React.FC<{ value: CardValue }> = ({ value }) => {
    switch (value) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return <p className="text-6xl">{value}</p>;
        case 'plus1':
            return (
                <div>
                    <p className="text-md">Withdraw</p>
                    <p className="text-xl">+1</p>
                </div>
            );
        case 'plus2':
            return (
                <div>
                    <p className="text-md">Withdraw</p>
                    <p className="text-xl">+2</p>
                </div>
            );
        case 'plus4':
            return (
                <div>
                    <p className="text-md">Withdraw</p>
                    <p className="text-xl">+4</p>
                </div>
            );
        case 'reverse':
            return (
                <div>
                    <p className="text-md">Reverse Play</p>
                </div>
            );
        case 'skip':
            return (
                <div>
                    <p className="text-lg">Skip</p>
                </div>
            );
        default:
            throw Error('unrecognizable card value: ' + value);
    }
};

const CardTopBottom: React.FC<{ value: CardValue }> = ({ value }) => {
    switch (value) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return <p className="text-lg">{value}</p>;
        case 'plus1':
            return (
                <div>
                    <p className="text-lg">+1</p>
                </div>
            );
        case 'plus2':
            return (
                <div>
                    <p className="text-lg">+2</p>
                </div>
            );
        case 'plus4':
            return (
                <div>
                    <p className="text-lg">+4</p>
                </div>
            );
        case 'reverse':
            return (
                <div>
                    <p className="text-lg">Reverse</p>
                </div>
            );
        case 'skip':
            return (
                <div>
                    <p className="text-lg">Skip</p>
                </div>
            );
        default:
            throw Error('unrecognizable card value: ' + value);
    }
};
