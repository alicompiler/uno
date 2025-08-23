import type { PropsWithChildren } from 'react';

export const EventsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            {children}
            <div className="fixed"></div>
        </div>
    );
};
