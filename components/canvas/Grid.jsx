'use client'

export default function Grid({ zoom }) {
  const gridSize = 50 * (zoom / 100);

  return (
    <div
      className="absolute inset-0 grid-bg"
      style={{
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  );
}