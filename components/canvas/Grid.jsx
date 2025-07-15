"use client";

export default function Grid({ zoom, gridSize }) {
  const size = gridSize * (zoom / 100);
  return (
    <div
      className="absolute inset-0 grid-bg pointer-events-none"
      style={{
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
