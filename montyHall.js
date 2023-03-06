// Settings
const attempts = 100000; // Number of games to run.
const do_switch = true; // Whether to switch doors or not.


console.log(`Starting the simulation with ${attempts} games in 2 seconds (switch?: ${do_switch}). ETA: ${attempts * 0.1} ms`);

// Wait 2 seconds
(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
})();

const start_time = performance.now();

// Declaring variables
let wins = 0;
let fails = 0;

// Main
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
        console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: win`);
    } else {
        ++fails;
        console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: lose`);
    }
}

// Verdict
const end_time = performance.now();
console.log(`========================================================\nSimulation results:\nAttempts: ${wins + fails}\nWins: ${wins}\nFails: ${fails}\nExperimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)\n`);

console.log(`========================================================\nElapsed time: ${end_time - start_time} ms`);
