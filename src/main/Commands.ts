import { Command, TerrainComponent } from '../types/Interfaces';
import { Rover } from './Rover';
import { initializeLogger } from '../utils/Logger';

const logger = initializeLogger();

export interface CommandFactory {
  createCommand(type: string, rover: Rover, terrain: TerrainComponent): Command;
}

export class MoveCommand implements Command {
  private rover: Rover;
  private terrain: TerrainComponent;

  constructor(rover: Rover, terrain: TerrainComponent) {
    this.rover = rover;
    this.terrain = terrain;
  }

  execute(): void {
    const [newX, newY] = this.rover.getNextPosition();
    if (this.terrain.hasObstacle(newX, newY)) {
      logger.error(`Cannot move to (${newX}, ${newY}): Obstacle detected`);
      throw new Error(`Cannot move to (${newX}, ${newY}): Obstacle detected`);
    }
    this.rover.move();
    logger.info(`Rover moved to (${newX}, ${newY}) facing ${this.rover.getDirection()}`);
  }
}

export class TurnLeftCommand implements Command {
  private rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  execute(): void {
    this.rover.turnLeft();
    logger.info(`Rover turned left, now facing ${this.rover.getDirection()}`);
  }
}

export class TurnRightCommand implements Command {
  private rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  execute(): void {
    this.rover.turnRight();
    logger.info(`Rover turned right, now facing ${this.rover.getDirection()}`);
  }
}

export class StatusCommand implements Command {
  private rover: Rover;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  execute(): void {
    const status = this.rover.getStatus();
    console.log(status);
    logger.info(`Status requested: ${status}`);
  }
}

export class CommandFactoryImpl implements CommandFactory {
  createCommand(type: string, rover: Rover, terrain: TerrainComponent): Command {
    switch (type.toUpperCase()) {
      case 'M':
        return new MoveCommand(rover, terrain);
      case 'L':
        return new TurnLeftCommand(rover);
      case 'R':
        return new TurnRightCommand(rover);
      case 'S':
        return new StatusCommand(rover);
      default:
        logger.error(`Invalid command type: ${type}`);
        throw new Error(`Invalid command: ${type}`);
    }
  }
}