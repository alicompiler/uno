import { useEffect, useRef, useState } from 'react';
import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';
import type { UnoCard } from '../../Domain/Card/UnoCard';
import { UnoCardComponent } from '../../Components/UnoCard/UnoCard';
import './styles.css';

interface Props {
    cards: GameStatus['players'][number]['cards'];
    onDiscardCard: (card: UnoCard) => void;
}

export function HandOfCards({ cards, onDiscardCard }: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
    const [previousCardsCount, setPreviousCardsCount] = useState(0);
    const cardsLength = cards.length;

    useEffect(() => {
        if (previousCardsCount < cardsLength) {
            const el = containerRef.current;
            if (!el) {
                return;
            }

            el.scrollTo({
                left: el.scrollWidth,
                behavior: 'smooth',
            });
        }
        setPreviousCardsCount(cardsLength);
    }, [cardsLength, previousCardsCount]);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;
        dragRef.current = { isDown: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        const s = dragRef.current;
        if (!el || !s.isDown) return;
        const dx = e.clientX - s.startX;
        if (Math.abs(dx) > 3) s.moved = true;
        el.scrollLeft = s.scrollLeft - dx;
        e.preventDefault();
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = containerRef.current;
        if (!el) return;
        dragRef.current.isDown = false;
        el.releasePointerCapture?.(e.pointerId);
    };

    const onCardClick = (id: string) => {
        console.log('onCardClick');
        if (dragRef.current.moved) {
            dragRef.current.moved = false;
            return;
        }

        if (selected === id) {
            onDiscardCard(cards.find((c) => c.id === id)!);
            setSelected(null);
            return;
        }

        setSelected(id);
    };

    return (
        <div className="relative max-w-full md:max-w-128 lg:max-w-144 flex items-end">
            <div
                ref={containerRef}
                className="no-scrollbar select-none overflow-x-auto flex items-end w-full cursor-grab active:cursor-grabbing pt-6"
                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
            >
                <div className="flex gap-4 px-4 py-2 min-w-max">
                    {cards.map((card) => {
                        const raised = card.id === selected;
                        return (
                            <button key={card.id} onClick={() => onCardClick(card.id)}>
                                <div
                                    className={`cursor-pointer transition-transform duration-300 ease-out ${
                                        raised ? '-translate-y-6 scale-105' : 'hover:-translate-y-2 hover:scale-105'
                                    }`}
                                    draggable={false}
                                >
                                    <UnoCardComponent card={card} height={120 * 1.5} width={70 * 1.5} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
