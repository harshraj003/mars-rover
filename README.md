# Mars Rover Simulation

## Abstract

A **TypeScript** console application simulating a Mars rover navigating a 2D grid, using **Command**, **Composite**, and **Factory** design patterns with features like batch command execution, command history, **Winston** logging, and an engaging space-themed interface.

---

## What is This Project?

The Mars Rover Simulation is an exciting console program built in **TypeScript** that lets you control a virtual Mars rover on a 2D grid, like you’re part of a real NASA mission. You set up a grid (think of it as a Mars map), add obstacles like rocks, and choose where the rover starts and which way it faces. Then, you give commands to move, turn, or check the rover’s status, and it smartly avoids obstacles. It’s designed to be easy to use, even for beginners, with a **“Mission Control”** theme that makes you feel like you’re exploring Mars. The program uses three design patterns to keep the code organized and shows off clean coding practices with error handling and logging.

---

## Why It Exists

This project was created to:

* Simulate a Mars rover navigating a grid, avoiding obstacles in a fun way.
* Demonstrate three design patterns (**Command, Composite, Factory**) in a clear, space-themed context.
* Provide a user-friendly experience with reliable code that’s easy to understand and extend.

---

## What It Does

* **Set Up a Mars Grid**: Create a grid (e.g., 10x10) and place obstacles.
* **Control the Rover**: Use commands like **M** (move forward), **L** (turn left), **R** (turn right), or **S** (check status).
* **Batch Commands**: Run multiple commands at once (e.g., `MMRMLM`) or use a batch mode.
* **Track History**: Shows the **last 5 commands** when you check status.
* **Avoid Obstacles**: Stops the rover from hitting rocks and shows an error.
* **Mission Control Theme**: Fun prompts make it feel like a real Mars mission.
* **Logging**: Saves actions to **mars-rover.log** and the console for tracking.

---

## How It’s Implemented

### Parameters

| Parameter | Description | Example |
| :--- | :--- | :--- |
| **Grid Setup** | Width and height (positive integers). | 10, 10 for a 10x10 grid. |
| | Number of obstacles (non-negative integer). | 2. |
| | Obstacle coordinates (x,y pairs, within grid bounds). | (2,2), (3,5). |
| **Rover Setup** | Starting position (x,y coordinates, within grid). | (0,0). |
| | Direction (string: N, S, E, W). | N for North. |
| **Commands** | Single commands: M, L, R, S, Q. | M (move), Q (quit). |
| | Batch commands: String of valid commands, or B for batch mode. | `MMRMLM`. |
| **Validation** | Grid: Positive integers, non-negative obstacle count, coordinates within bounds. | |
| | Rover: Coordinates within grid, valid direction (N, S, E, W). | |
| | Commands: Valid single or batch commands (regex: `[MLRSQ]+` for batch). | |
| **Outputs** | Console messages (e.g., “Rover moved to (0,1) facing N”). | |
| | Status report: Position, direction, last 5 commands. | e.g., “Rover is at (1,3) facing N. Last 5 commands: M, R, M, L, M”. |
| | Logs: Written to **mars-rover.log** with timestamps. | |

### Workflow

1.  **Program Start**: Loads `MarsRoverDemo.ts` and shows “Mission Control” welcome.
2.  **Grid Setup**:
    * Prompts for width, height, and number of obstacles.
    * For each obstacle, prompts for x,y coordinates, stored in a **Set** for fast lookup.
    * Validates inputs with **retries (3 attempts)** for invalid numbers or out-of-bounds coordinates.
3.  **Rover Setup**:
    * Prompts for starting x,y coordinates and direction.
    * Validates coordinates (within grid) and direction (N, S, E, W).
4.  **Command Loop**:
    * Prompts for a command or batch sequence.
    * **For single commands**:
        * **M**: Moves rover one step in its direction, checks for obstacles.
        * **L/R**: Rotates rover 90 degrees left/right.
        * **S**: Shows position, direction, and last 5 commands (stored in an array).
        * **Q**: Exits the program.
        * **B**: Enters batch mode, processes a sequence like `MMRMLM`.
    * **For batch commands**: Processes each command in sequence, stopping if invalid or blocked.
    * Invalid inputs trigger retries (3 attempts).
5.  **Logging**: Each action (setup, movement, errors) is logged to `mars-rover.log` and console.
6.  **Loop**: Continues prompting for commands until **Q** is entered.

### Key Features in Code

* **TypeScript**: Ensures safe coding with strict type checks.
* **Design Patterns**:
    * **Command**: `Commands.ts` defines `MoveCommand`, `TurnLeftCommand`, etc., for flexible actions.
    * **Composite**: `Terrain.ts` uses a **Set** for $O(1)$ obstacle checks.
    * **Factory**: `CommandFactoryImpl` in `Commands.ts` creates commands dynamically.
* **Error Handling**: `try-catch` in `MarsRoverDemo.ts` and `RetryOperation.ts` for retries.
* **Logging**: `Logger.ts` uses **Winston** for console and file logging.
* **History**: `Rover.ts` tracks last 5 commands in a fixed-size array.

---

## How to Set Up and Run

### What You Need

* **Node.js**: Download version **20.x** from [nodejs.org](https://nodejs.org/).
* **Git**: Install from [git-scm.com](https://git-scm.com/).
* A terminal (e.g., Command Prompt on Windows) and an editor like VS Code.

### Step-by-Step Setup

1.  **Get the Code**:
    Open Command Prompt and run:
    ```bash
    git clone [https://github.com/harshraj003/mars-rover.git](https://github.com/harshraj003/mars-rover.git)
    cd mars-rover
    ```

2.  **Install Tools**:
    Run:
    ```bash
    npm install
    ```
    This sets up TypeScript, Winston, and other dependencies.

3.  **Start the Program**:
    Run:
    ```bash
    npm start
    ```
    Follow prompts to set up the grid, obstacles, rover, and enter commands.

4.  **Optional: Build Code**:
    * To compile TypeScript to JavaScript:
        ```bash
        npm run build
        ```
    * To check for errors without saving files:
        ```bash
        npx tsc --noEmit
        ```

5.  **View Logs**:
    Check the log file:
    ```bash
    type mars-rover.log
    ```
    *Example:*
    `2025-10-02T16:36:45 [INFO]: Rover moved to (0,1) facing N`

---

## How to Use It

### Launch the Program

Run `npm start` to see:

=== Mars Rover Mission Control ===
Initializing Mars Rover Mission...
Set Up the Mission:
Enter grid size (e.g., 10 for width, 10 for height).
Add obstacles (e.g., (2,2), (3,5)).
Set rover’s starting point and direction (e.g., (0,0,N)).
Give Commands:
Single commands: M (move), L (left), R (right), S (status), Q (quit).
Batch commands: Type MMRMLM or B for batch mode.


### Example Interaction

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
2025-10-02T16:36:45 [INFO]: Rover moved to (0,1) facing N
2025-10-02T16:36:45 [INFO]: Rover moved to (0,2) facing N
2025-10-02T16:36:45 [INFO]: Rover turned right, now facing E
2025-10-02T16:36:45 [INFO]: Rover moved to (1,2) facing E
2025-10-02T16:36:45 [INFO]: Rover turned left, now facing N
2025-10-02T16:36:45 [INFO]: Rover moved to (1,3) facing N
Enter command or batch: S
Rover is at (1,3) facing N. Last 5 commands: M, M, R, M, L.
Enter command or batch: Q
Mission Control: Exiting...


### Handling Mistakes

* Invalid command (e.g., X) triggers:
    `2025-10-02T16:36:45 [WARN]: Invalid input. Use M, L, R, S, Q, or a sequence. Attempt 1/3`

---

## What’s in the Code?

### Project Structure

.gitignore: Skips temporary files like node_modules.
README.md: This guide.
package.json: Lists dependencies and scripts.
tsconfig.json: Configures TypeScript for strict checks.
src/:
main/: Core logic (e.g., Rover.ts, Terrain.ts).
types/: Defines data types (e.g., Enums.ts for directions).
utils/: Tools like Logger.ts and RetryOperation.ts.


### Code Highlights

* **TypeScript**: Ensures reliable code with strict typing.
* **Modular Design**: Splits code into clear, focused files.
* **Best Practices**: Follows **SOLID** principles for maintainability.
* **Performance**: Uses **Set** for fast obstacle checks and an array for command history.

### Why It’s Great

* **Immersive**: Feels like a real Mars mission with “Mission Control” prompts.
* **Smart Features**: Batch commands and history make it powerful.
* **Reliable**: Stops at obstacles, retries invalid inputs, and logs actions.
* **Clear Code**: Easy to read and extend, great for learning.
* **Engaging**: Fun and interactive for all users.

---

## Testing the Program

### Test Cases

| Scenario | Input | Expected Output Snippet |
| :--- | :--- | :--- |
| **Standard Run** | Grid 10x10, Obstacles (2,2), (3,5), Start (0,0,N), Commands M M R M L M S Q | `Rover is at (1,3) facing N. Last 5 commands: M, R, M, L, M.` |
| **Batch Command** | Grid 10x10, Obstacles (2,2), (3,5), Start (0,0,N), Command `MMRMLM` | `Rover moved to (1,3) facing N` |
| **Obstacle** | Grid 10x10, Obstacle (0,1), Start (0,0,N), Command M | `Cannot move to (0,1): Obstacle detected` |

---

## Future Improvements

* Add an **“undo”** command to reverse moves.
* Show a **visual grid** in the console.
* Add new commands like scanning terrain.

---

## Contact

Reach out to **Harsh Raj** on GitHub: [harshraj003](https://github.com/harshraj003) for quest