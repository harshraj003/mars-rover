import { Direction } from '../types/Enums';
import { initializeLogger } from '../utils/Logger';

const logger = initializeLogger();

export class Rover {
  private x: number;
  private y: number;
  private direction: Direction;
  private commandHistory: string[];

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.commandHistory = [];
    logger.info(`Rover initialized at (${x}, ${y}) facing ${direction}`);
  }

  move(): void {
    const [newX, newY] = this.getNextPosition();
    this.x = newX;
    this.y = newY;
    this.commandHistory.push('M');
  }

  turnLeft(): void {
    const turns: { [key in Direction]: Direction } = {
      [Direction.N]: Direction.W,
      [Direction.W]: Direction.S,
      [Direction.S]: Direction.E,
      [Direction.E]: Direction.N
    };
    this.direction = turns[this.direction];
    this.commandHistory.push('L');
  }

  turnRight(): void {
    const turns: { [key in Direction]: Direction } = {
      [Direction.N]: Direction.E,
      [Direction.E]: Direction.S,
      [Direction.S]: Direction.W,
      [Direction.W]: Direction.N
    };
    this.direction = turns[this.direction];
    this.commandHistory.push('R');
  }

  getNextPosition(): [number, number] {
    let newX = this.x;
    let newY = this.y;
    switch (this.direction) {
      case Direction.N: newY++; break;
      case Direction.S: newY--; break;
      case Direction.E: newX++; break;
      case Direction.W: newX--; break;
    }
    return [newX, newY];
  }

  getPosition(): [number, number] {
    return [this.x, this.y];
  }

  getDirection(): Direction {
    return this.direction;
  }

  getStatus(): string {
    const history = this.commandHistory.length > 0 ? `Last ${Math.min(5, this.commandHistory.length)} commands: ${this.commandHistory.slice(-5).join(', ')}` : 'No commands executed';
    return `Rover is at (${this.x}, ${this.y}) facing ${this.direction}. ${history}.`;
  }
}