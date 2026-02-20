/*
 * Watermark — renders the user's email diagonally across the entire viewport
 * Pointer-events: none so it doesn't block interaction
 */
import { useMemo } from "react";

interface WatermarkProps {
  email: string;
}

export default function Watermark({ email }: WatermarkProps) {
  const tiles = useMemo(() => {
    const items: { id: number; top: number; left: number }[] = [];
    let id = 0;
    for (let row = -20; row < 120; row += 12) {
      for (let col = -60; col < 160; col += 30) {
        items.push({ id: id++, top: row, left: col });
      }
    }
    return items;
  }, []);

  return (
    <div className="watermark-overlay" aria-hidden="true">
      {tiles.map((t) => (
        <span
          key={t.id}
          className="watermark-text"
          style={{ top: `${t.top}%`, left: `${t.left}%` }}
        >
          {email}
        </span>
      ))}
    </div>
  );
}
