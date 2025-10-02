export interface Command {
  execute(): void;
}

export interface TerrainComponent {
  hasObstacle(x: number, y: number): boolean;
}