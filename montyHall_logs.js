const fs = require("fs");

// Settings
const attempts = 2500; // Number of games to run.
const do_switch = true; // Whether to switch doors or not.


console.log(`Starting the simulation with ${attempts} games in 2 seconds (switch?: ${do_switch}). ETA: ${attempts * 1.3} ms`);
fs.appendFileSync("./logs/log.txt", `Starting the simulation with ${attempts} games (switch?: ${do_switch}). ETA: ${attempts * 1.3} ms\n`); //Logs

// Wait 2 seconds
(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
})();

// Declaring variables
let wins = 0;
let fails = 0;

// Main
const start_time = performance.now();

for(let i = 0; i < attempts; i++) {
    // Generate the treasure door
    let treasureDoor = Math.floor(Math.random() * 3 + 1);

    // Generate the user's choice
    let userDoor = Math.floor(Math.random() * 3 + 1);

    // Generate the host's choice
    let hostDoor = [1, 2, 3].find((door) => {
        return door !== treasureDoor && door !== userDoor;
    });

    // Generate the new user door, if applicable.
    let newUserDoor;
    switch(do_switch) {
        case true:
            // Switch the user's door
            newUserDoor = [1, 2, 3].find((door) => {
                return door !== hostDoor && door !== userDoor;
            });
            break;
        default:
            // No changes
            newUserDoor = userDoor;
            break;
    }

    // Game end
    if(newUserDoor === treasureDoor) {
        ++wins;
        console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: win\n`);
        fs.appendFileSync("./logs/log.txt", `------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: win\n`); //Logs
    } else {
        ++fails;
        console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: lose`);
        fs.appendFileSync("./logs/log.txt", `------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: lose\n`); //Logs
    }
}

// Verdict
const end_time = performance.now();
console.log(`========================================================\nSimulation results:\nAttempts: ${wins + fails}\nWins: ${wins}\nFails: ${fails}\nExperimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)\n`);
fs.appendFileSync("./logs/log.txt", `========================================================\nSimulation results:\nAttempts: ${wins + fails}\nWins: ${wins}\nFails: ${fails}\nExperimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)\n`); //Logs

console.log(`========================================================\nElapsed time: ${end_time - start_time} ms`);
fs.appendFileSync("./logs/log.txt", `========================================================\nElapsed time: ${end_time - start_time} ms\n`); //Logs
