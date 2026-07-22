import type { StoreMap } from "@/types";

export function StoreMapView({
  map,
  highlightAisleNumber,
}: {
  map: StoreMap;
  highlightAisleNumber?: number | null;
}) {
  return (
    <svg
      className="store-map-svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label="店内マップ"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="98" height="98" rx="3" fill="var(--color-background)" stroke="var(--color-border)" />
      {map.aisles.map((aisle) => {
        const isHighlighted = aisle.aisleNumber === highlightAisleNumber;
        return (
          <g key={aisle.aisleNumber}>
            <rect
              x={aisle.x}
              y={aisle.y}
              width={aisle.width}
              height={aisle.height}
              rx={1.5}
              fill={isHighlighted ? "var(--color-primary)" : "var(--color-primary-light)"}
              stroke={isHighlighted ? "var(--color-primary-dark)" : "var(--color-primary)"}
              strokeWidth={isHighlighted ? 0.8 : 0.4}
            />
            <text
              x={aisle.x + aisle.width / 2}
              y={aisle.y + aisle.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="3.2"
              fontWeight={isHighlighted ? 700 : 500}
              fill={isHighlighted ? "#ffffff" : "var(--color-primary-dark)"}
            >
              {aisle.sectionName}
            </text>
          </g>
        );
      })}
      <circle cx={map.entrance.x} cy={map.entrance.y} r={2.2} fill="var(--color-text-sub)" />
      <text
        x={map.entrance.x}
        y={map.entrance.y + 5}
        textAnchor="middle"
        fontSize="3"
        fill="var(--color-text-sub)"
      >
        入口
      </text>
    </svg>
  );
}
