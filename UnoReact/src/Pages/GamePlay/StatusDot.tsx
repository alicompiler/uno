import type { ConnectionStatus } from './GamePlayPage';

const statusStyles: Record<ConnectionStatus, string> = {
    connected: 'bg-green-500 ring-green-400',
    disconnected: 'bg-red-500 ring-red-400',
    connecting: 'bg-amber-400 ring-amber-300',
};

export function StatusDot({
    status,
    size = 10, // px size of the dot (10–16 looks great)
    title,
}: {
    status: ConnectionStatus;
    size?: number;
    title?: string;
}) {
    const base = `relative inline-block rounded-full ring-2 ring-offset-2`;
    const anim =
        status === 'connecting'
            ? 'after:content-[""] after:absolute after:inset-0 after:rounded-full after:animate-ping after:bg-current/40'
            : '';

    return (
        <span
            className={`${base} ${statusStyles[status]} ${anim}`}
            style={{ width: size, height: size }}
            role="status"
            aria-label={`Status: ${status}`}
            title={title ?? `Status: ${status}`}
        />
    );
}
