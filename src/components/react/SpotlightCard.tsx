import { useRef, type MouseEvent, type ReactNode } from 'react';
import './SpotlightCard.css';

interface Props {
  children?: ReactNode;
  className?: string;
  /** Color del foco. Por defecto, el cian de la marca. */
  spotlightColor?: string;
  /**
   * Retraso de la aparición al entrar en pantalla, en ms. El <astro-island>
   * que envuelve al componente es display:contents, así que la animación tiene
   * que colgar de este div y no del contenedor de la grilla.
   */
  revealDelay?: number;
}

/**
 * SpotlightCard de React Bits (reactbits.dev).
 * Mueve un foco radial siguiendo al cursor dentro de la tarjeta.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 200, 230, 0.18)',
  revealDelay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const seguirCursor = (evento: MouseEvent<HTMLDivElement>) => {
    const caja = ref.current;
    if (!caja) return;
    const rect = caja.getBoundingClientRect();
    caja.style.setProperty('--mouse-x', `${evento.clientX - rect.left}px`);
    caja.style.setProperty('--mouse-y', `${evento.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={seguirCursor}
      className={`card-spotlight ${className}`.trim()}
      data-reveal=""
      style={
        {
          '--spotlight-color': spotlightColor,
          '--reveal-delay': `${revealDelay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
