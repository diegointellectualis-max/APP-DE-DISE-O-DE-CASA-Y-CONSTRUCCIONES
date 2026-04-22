import { Point } from '../types/plan';

/**
 * Calculates the area of a polygon using the shoelace formula.
 */
export function calculateRoomArea(points: Point[]): number {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area) / 2;
}

export function formatArea(area: number): string {
  return `${area.toFixed(1)} m²`;
}

export function getBoundingBox(points: Point[]) {
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

export function getMaterialColor(material: string): string {
  switch (material) {
    case 'Wood': return '#b45309';
    case 'Marble': return '#e5e7eb';
    case 'Concrete': return '#6b7280';
    case 'Tiles': return '#9ca3af';
    case 'Carpet': return '#4b5563';
    default: return '#cccccc';
  }
}
