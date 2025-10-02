import { TerrainComponent } from '../types/Interfaces';
import { initializeLogger } from '../utils/Logger';

const logger = initializeLogger();

export class Terrain implements TerrainComponent {
  private width: number;
  private height: number;
  private obstacles: Set<string>;

  constructor(width: number, height: number, obstacles: [number, number][]) {
    if (width <= 0 || height <= 0) {
      logger.error('Terrain dimensions must be positive');
      throw new Error('Terrain dimensions must be positive');
    }
    this.width = width;
    this.height = height;
    this.obstacles = new Set(obstacles.map(([x, y]) => `${x},${y}`));
    logger.info(`Terrain initialized: ${width}x${height} with ${obstacles.length} obstacles`);
  }

  hasObstacle(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      logger.warn(`Position (${x}, ${y}) is out of bounds`);
      return true;
    }
    const hasObs = this.obstacles.has(`${x},${y}`);
    if (hasObs) logger.info(`Obstacle detected at (${x}, ${y})`);
    return hasObs;
  }
}