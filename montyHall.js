// Settings
const attempts = 10000; // Number of games to run.
const do_switch = true; // Whether to switch doors or not.

console.log(`Starting the simulation with ${attempts} games.`);

let wins = 0;
let fails = 0;

const start_time = performance.now();

for (let i = 0; i < attempts; i++) {
    // Generate the treasure door and the user's choice
    const treasureDoor = Math.floor(Math.random() * 3);
    const userDoor = Math.floor(Math.random() * 3);

    // Determine the host's choice
    const hostDoor = [0, 1, 2].find(door => door !== treasureDoor && door !== userDoor);

    // Determine the new user door if switching
    const newUserDoor = do_switch ? [0, 1, 2].find(door => door !== hostDoor && door !== userDoor) : userDoor;

    // Check if the user wins
    const win = newUserDoor === treasureDoor;
    wins += win ? 1 : 0;
    fails += win ? 0 : 1;

    // Logging each game result
    console.log(`------------------------------\nTreasure door: ${treasureDoor + 1}\nUser door: ${userDoor + 1}\nGame ${i + 1} result: ${win ? "win" : "lose"}`);
}

// Verdict
const end_time = performance.now();

console.log(`========================================================\nSimulation results:\nAttempts: ${wins + fails}\nWins: ${wins}\nFails: ${fails}\nExperimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)`);
console.log(`========================================================\nElapsed time: ${end_time - start_time} ms`);
