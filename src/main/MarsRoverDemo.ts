import { initializeLogger } from '../utils/Logger';
import { retryOperation } from '../utils/RetryOperation';
import { Terrain } from './Terrain';
import { Rover } from './Rover';
import { CommandFactoryImpl } from './Commands';
import { Direction } from '../types/Enums';
import readlineSync from 'readline-sync';

const logger = initializeLogger();

function initializeRover(): [Rover, Terrain] {
  console.log('Initializing Mars Rover Mission...');
  const width = retryOperation(() => {
    const input = readlineSync.question('Enter terrain width (positive integer): ');
    const num = parseInt(input, 10);
    if (isNaN(num) || num <= 0) throw new Error('Width must be a positive integer');
    return num;
  });
  const height = retryOperation(() => {
    const input = readlineSync.question('Enter terrain height (positive integer): ');
    const num = parseInt(input, 10);
    if (isNaN(num) || num <= 0) throw new Error('Height must be a positive integer');
    return num;
  });
  const obstacleCount = retryOperation(() => {
    const input = readlineSync.question('Enter number of obstacles (non-negative): ');
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0) throw new Error('Obstacle count must be non-negative');
    return num;
  });
  const obstacles: [number, number][] = [];
  for (let i = 0; i < obstacleCount; i++) {
    const x = retryOperation(() => {
      const input = readlineSync.question(`Enter obstacle ${i + 1} x-coordinate (0-${width - 1}): `);
      const num = parseInt(input, 10);
      if (isNaN(num) || num < 0 || num >= width) throw new Error(`Invalid x-coordinate (0-${width - 1})`);
      return num;
    });
    const y = retryOperation(() => {
      const input = readlineSync.question(`Enter obstacle ${i + 1} y-coordinate (0-${height - 1}): `);
      const num = parseInt(input, 10);
      if (isNaN(num) || num < 0 || num >= height) throw new Error(`Invalid y-coordinate (0-${height - 1})`);
      return num;
    });
    obstacles.push([x, y]);
  }
  const terrain = new Terrain(width, height, obstacles);
  const x = retryOperation(() => {
    const input = readlineSync.question(`Enter rover starting x-coordinate (0-${width - 1}): `);
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0 || num >= width || terrain.hasObstacle(num, 0)) {
      throw new Error(`Invalid starting x-coordinate or obstacle at position`);
    }
    return num;
  });
  const y = retryOperation(() => {
    const input = readlineSync.question(`Enter rover starting y-coordinate (0-${height - 1}): `);
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 0 || num >= height || terrain.hasObstacle(x, num)) {
      throw new Error(`Invalid starting y-coordinate or obstacle at position`);
    }
    return num;
  });
  const directionInput = retryOperation(() => {
    const input = readlineSync.question('Enter rover direction (N, S, E, W): ').toUpperCase();
    if (!Object.values(Direction).includes(input as Direction)) {
      throw new Error('Invalid direction. Choose N, S, E, or W');
    }
    return input as Direction;
  });
  const rover = new Rover(x, y, directionInput);
  logger.info('Rover mission initialized successfully');
  return [rover, terrain];
}

function main(): void {
  console.log('=== Mars Rover Mission Control ===');
  const [rover, terrain] = initializeRover();
  const commandFactory = new CommandFactoryImpl();
  let running = true;
  while (running) {
    console.log('\nCommands: M (move), L (left), R (right), S (status), B (batch), Q (quit)');
    console.log('Batch example: MMRMLM (executes multiple commands)');
    const input = retryOperation(() => {
      const input = readlineSync.question('Enter command or batch: ').toUpperCase().trim();
      if (!input.match(/^[MLRSQ]+$/) && input !== 'B') {
        throw new Error('Invalid input. Use M, L, R, S, Q, or a sequence of M, L, R, S (e.g., MMRMLM)');
      }
      return input;
    });
    try {
      if (input === 'Q') {
        running = false;
        logger.info('Mission terminated');
        console.log('Mission Control: Exiting...');
        continue;
      }
      if (input === 'B' || input.match(/^[MLRS]+$/)) {
        const batch = input === 'B'
          ? retryOperation(() => {
              const batchInput = readlineSync.question('Enter batch commands (e.g., MMRMLM): ').toUpperCase().trim();
              if (!batchInput.match(/^[MLRS]+$/)) {
                throw new Error('Batch commands must be M, L, R, or S');
              }
              return batchInput;
            })
          : input;
        for (const cmd of batch.split('')) {
          const command = commandFactory.createCommand(cmd, rover, terrain);
          command.execute();
        }
        logger.info(`Batch commands executed: ${batch}`);
        continue;
      }
      const command = commandFactory.createCommand(input, rover, terrain);
      command.execute();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`Mission Control Error: ${message}`);
      logger.error(`Command error: ${message}`);
    }
  }
}

main();