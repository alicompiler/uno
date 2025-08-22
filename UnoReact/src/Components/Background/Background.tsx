export const Background: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-radial from-neutral-900 via-black to-black" />

            <div className="absolute inset-0">
                <div className="absolute -left-20 top-1/4 w-1/2 h-1/2 rotate-45 bg-gradient-to-r from-red-600/40 to-transparent blur-3xl" />

                <div className="absolute right-0 top-0 w-1/3 h-1/2 -rotate-12 bg-gradient-to-l from-blue-500/40 to-transparent blur-3xl" />

                <div className="absolute left-1/3 bottom-0 w-1/2 h-1/2 rotate-12 bg-gradient-to-t from-green-500/40 to-transparent blur-3xl" />

                <div className="absolute right-1/4 bottom-0 w-1/2 h-1/2 -rotate-45 bg-gradient-to-t from-yellow-500/40 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 flex items-center justify-center h-full">{children}</div>
        </div>
    );
};
