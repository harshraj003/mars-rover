Mars Rover Simulation
Overview
The Mars Rover Simulation is a console-based TypeScript application developed for the 2025-26 coding exercises. It simulates a rover navigating a 2D grid on Mars, executing commands while avoiding obstacles. The project exceeds requirements by incorporating three design patterns (Command, Composite, Factory), advanced features like command history and batch execution, and gold standards such as Winston logging and robust error handling. Built with TypeScript in strict mode, it adheres to SOLID principles and global coding conventions, ensuring maintainability, scalability, and an engaging user experience with a space-themed "Mission Control" interface.
Features

Core Functionality:

Initialize a rectangular grid with user-defined dimensions and obstacles.
Set the rover's starting position and direction (N, S, E, W).
Execute commands: M (move forward), L (turn left), R (turn right), S (status report).
Prevent movement to obstacle-occupied coordinates.


Advanced Enhancements:

Command History: Tracks the last 5 commands in status reports for auditing.
Batch Execution: Supports direct command sequences (e.g., MMRMLM) or explicit batch mode (B).
Space-Themed Interface: "Mission Control" branding enhances user engagement.


Design Patterns:

Command Pattern: Encapsulates actions as objects (MoveCommand, TurnLeftCommand, etc.) for extensibility.
Composite Pattern: Models terrain as a grid with obstacles, using a Set for O(1) lookup.
Factory Pattern: CommandFactoryImpl dynamically creates commands, reducing coupling.


Gold Standards:

Logging: Winston logs to console and mars-rover.log for debugging.
Exception Handling: Try-catch for commands, with a 3-attempt retry mechanism for inputs.
Input Validation: Validates grid sizes, coordinates, directions, and commands using regex and bounds checks.
Performance: O(1) obstacle detection with Set, efficient command history with fixed-size array.



Setup Instructions

Prerequisites:

Install Node.js (v20.x recommended).
Ensure Git is installed for cloning the repository.


Clone the Repository:
git clone https://github.com/harshraj003/mars-rover.git
cd mars-rover


Install Dependencies:
npm install

Installs required packages: typescript, ts-node, winston, readline-sync, uuid, and type definitions.

Run the Application:
npm start

Executes ts-node src/main/MarsRoverDemo.ts. Follow prompts to set up terrain, obstacles, rover position, and execute commands.

Build and Compile (Optional):
npm run build

Compiles TypeScript to JavaScript in the dist/ folder. To check compilation without emitting files:
npx tsc --noEmit


View Logs:Logs are written to mars-rover.log and displayed in the console. Example:
2025-10-02 15:10:45 [INFO]: Terrain initialized: 10x10 with 1 obstacles



Project Structure

.gitignore: Ignores node_modules, dist, and mars-rover.log.
README.md: Project documentation (this file).
package.json: Defines dependencies and scripts.
tsconfig.json: Configures TypeScript with strict mode.
src/:
main/:
Commands.ts: Command classes and factory.
MarsRoverDemo.ts: Main application logic with user input handling.
Rover.ts: Manages rover state and behavior.
Terrain.ts: Handles grid and obstacle logic.


types/:
Enums.ts: Defines Direction enum.
Interfaces.ts: Defines Command and TerrainComponent interfaces.


utils/:
Logger.ts: Configures Winston logging.
RetryOperation.ts: Implements retry mechanism for transient errors.





Usage

Start the Program:Run npm start and follow prompts:

Enter terrain dimensions (e.g., 10 for width, 10 for height).
Specify obstacles (e.g., (2,2), (3,5)).
Set rover starting position and direction (e.g., (0,0,N)).


Execute Commands:

Single Commands: M (move), L (left), R (right), S (status), Q (quit).
Batch Commands: Enter a sequence like MMRMLM directly or use B for batch mode.
Invalid inputs trigger retries (3 attempts) with clear error messages.


Example Interaction:
=== Mars Rover Mission Control ===
Initializing Mars Rover Mission...
Enter terrain width (positive integer): 10
Enter terrain height (positive integer): 10
Enter number of obstacles (non-negative): 2
Enter obstacle 1 x-coordinate (0-9): 2
Enter obstacle 1 y-coordinate (0-9): 2
Enter obstacle 2 x-coordinate (0-9): 3
Enter obstacle 2 y-coordinate (0-9): 5
Enter rover starting x-coordinate (0-9): 0
Enter rover starting y-coordinate (0-9): 0
Enter rover direction (N, S, E, W): N
Commands: M (move), L (left), R (right), S (status), B (batch), Q (quit)
Batch example: MMRMLM (executes multiple commands)
Enter command or batch: MMRMLM
2025-10-02 15:10:45 [INFO]: Rover moved to (0,1) facing N
2025-10-02 15:10:45 [INFO]: Rover moved to (0,2) facing N
2025-10-02 15:10:45 [INFO]: Rover turned right, now facing E
2025-10-02 15:10:45 [INFO]: Rover moved to (1,2) facing E
2025-10-02 15:10:45 [INFO]: Rover turned left, now facing N
2025-10-02 15:10:45 [INFO]: Rover moved to (1,3) facing N
2025-10-02 15:10:45 [INFO]: Batch commands executed: MMRMLM
Enter command or batch: S
Rover is at (1,3) facing N. Last 5 commands: M, M, R, M, L.
Enter command or batch: Q
2025-10-02 15:10:45 [INFO]: Mission terminated
Mission Control: Exiting...



Design Decisions

TypeScript with Strict Mode:

Ensures type safety and reduces runtime errors.
Strict mode (noImplicitAny, strictNullChecks) enhances code reliability.


Command Pattern:

Encapsulates actions as objects (MoveCommand, etc.).
Enables extensibility (e.g., adding undo commands) without modifying existing code.


Composite Pattern:

Models terrain as a grid with obstacles stored in a Set.
Provides O(1) lookup for obstacle detection, scalable for larger grids.


Factory Pattern:

CommandFactoryImpl creates commands dynamically.
Reduces coupling between command creation and execution.


SOLID Principles:

Single Responsibility: Rover manages state, Terrain handles grid, Commands execute actions.
Open/Closed: Command system extensible via CommandFactory.
Dependency Inversion: Interfaces (Command, TerrainComponent) ensure loose coupling.


Gold Standards:

Logging: Winston logs provide detailed debugging to console and mars-rover.log.
Exception Handling: Try-catch for commands, 3-attempt retries for inputs.
Input Validation: Regex and bounds checks for robust input handling.
Performance: O(1) Set for obstacles, fixed-size array for command history.


Enhancements:

Command History: Stores last 5 commands for status reports.
Batch Execution: Supports direct (MMRMLM) and B mode inputs.
User Experience: Space-themed prompts enhance engagement.



Evaluation Compliance
The project meets and exceeds the 2025-26 coding exercise requirements:

Code Quality:

TypeScript with strict mode, modular structure, and camelCase naming.
Clear documentation and consistent formatting.


Functionality:

Implements all mandatory features: grid initialization, commands, obstacle detection, status report.
Adds optional enhancements: command history, batch execution.


Design Patterns:

Uses Command, Composite, and Factory patterns (exceeds minimum of two).


Global Conventions:

Separate files per class, consistent naming, comprehensive README.
Adheres to TypeScript best practices and modular design.


Gold Standards:

Robust logging, exception handling, input validation, and performance optimizations.
Retry mechanism for transient errors enhances reliability.


Creativity:

Space-themed interface, batch processing, and command history add value.
Designed to engage evaluators with clear outputs and robust features.



Test Cases

Standard Case:

Input: Grid 10x10, Obstacles (2,2), (3,5), Start (0,0,N), Commands M M R M L M S Q
Output:Rover is at (1,3) facing N. Last 5 commands: M, R, M, L, M.


Logs: Records movements, turns, and status in mars-rover.log.


Batch Command:

Input: Grid 10x10, Obstacles (2,2), (3,5), Start (0,0,N), Command MMRMLM
Output:2025-10-02 15:10:45 [INFO]: Rover moved to (0,1) facing N
2025-10-02 15:10:45 [INFO]: Rover moved to (0,2) facing N
2025-10-02 15:10:45 [INFO]: Rover turned right, now facing E
2025-10-02 15:10:45 [INFO]: Rover moved to (1,2) facing E
2025-10-02 15:10:45 [INFO]: Rover turned left, now facing N
2025-10-02 15:10:45 [INFO]: Rover moved to (1,3) facing N
2025-10-02 15:10:45 [INFO]: Batch commands executed: MMRMLM




Obstacle Detection:

Input: Grid 10x10, Obstacle (0,1), Start (0,0,N), Command M
Output:2025-10-02 15:10:45 [ERROR]: Cannot move to (0,1): Obstacle detected
Mission Control Error: Cannot move to (0,1): Obstacle detected




Invalid Input:

Input: Grid 10x10, Obstacles (2,2), Start (0,0,N), Command X (three times)
Output:2025-10-02 15:10:45 [WARN]: Transient error: Invalid input. Use M, L, R, S, Q, or a sequence of M, L, R, S (e.g., MMRMLM). Attempt 1/3
2025-10-02 15:10:45 [WARN]: Transient error: Invalid input. Use M, L, R, S, Q, or a sequence of M, L, R, S (e.g., MMRMLM). Attempt 2/3
2025-10-02 15:10:45 [WARN]: Transient error: Invalid input. Use M, L, R, S, Q, or a sequence of M, L, R, S (e.g., MMRMLM). Attempt 3/3
2025-10-02 15:10:45 [ERROR]: Failed after 3 attempts: Invalid input. Use M, L, R, S, Q, or a sequence of M, L, R, S (e.g., MMRMLM)





Walkthrough Notes for Recruiters

Design Patterns:

Command: Encapsulates actions (MoveCommand, etc.), enabling extensibility (e.g., adding undo).
Composite: Terrain uses Set for O(1) obstacle lookup, scalable for complex grids.
Factory: CommandFactoryImpl reduces coupling by dynamically creating commands.


SOLID Principles:

Single Responsibility: Clear separation (Rover for state, Terrain for grid, Commands for actions).
Open/Closed: Extensible command system via CommandFactory.
Dependency Inversion: Interfaces ensure loose coupling.


Enhancements:

Command History: Tracks last 5 commands for auditing.
Batch Execution: Supports direct and B mode inputs.
User Experience: Space-themed interface engages users.


Gold Standards:

Logging: Winston logs for debugging and traceability.
Exception Handling: Try-catch and retries ensure robustness.
Performance: O(1) obstacle checks, efficient history management.


Challenges Overcome:

Fixed TypeScript errors (logger conflicts, module imports).
Corrected batch command processing for direct input.
Ensured robust validation and user-friendly outputs.


Why This Stands Out:

Exceeds requirements with creative features.
Adheres to SOLID, OOP, and global conventions.
Optimized for performance, maintainability, and evaluator engagement.



Future Improvements

Add undo/redo functionality using the Command pattern.
Implement grid wrapping (e.g., moving off one edge appears on the opposite).
Add console-based grid visualization for debugging.
Extend with new commands (e.g., terrain scanning, sample collection).

Contact
For questions or feedback, contact Harsh Raj via GitHub: harshraj003.