export const CardBack: React.FC<{ width: number; height: number }> = ({ width, height }) => {
    return (
        <div
            className="rounded bg-amber-500 flex items-center justify-center shadow-md px-8 py-16"
            style={{
                width,
                height,
            }}
        >
            <div className="-rotate-12 w-[60px] h-[80px] rounded-full bg-white flex items-center justify-center">
                <span className="font-extrabold text-lg tracking-wider italic text-black">UNO</span>
            </div>
        </div>
    );
};
