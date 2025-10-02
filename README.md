# Mars Rover Simulation

An advanced console-based TypeScript application simulating a Mars Rover navigating a grid with obstacle detection, command history, and batch execution.

## Features
- **Command Pattern**: Encapsulates move, turn left, turn right, and status commands.
- **Composite Pattern**: Represents terrain as a grid with obstacles (O(1) lookup using Set).
- **Factory Pattern**: Creates command objects dynamically.
- **OOP**: Encapsulation, polymorphism, and inheritance for Rover and Terrain.
- **Enhancements**: Command history, batch command input, detailed status reports.
- **Gold Standards**: Winston logging, retry mechanism, robust exception handling, input validations.
- **Best Practices**: SOLID principles, modular structure, TypeScript strict mode.

## Setup
1. Install Node.js (v20.x recommended).
2. Clone the repository:
   ```bash
   git clone https://github.com/harshraj003/mars-rover.git
   cd mars-rover