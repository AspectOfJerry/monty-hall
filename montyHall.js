// Settings
const attempts = 1000; // Number of games to run.
const do_switch = true; // Whether to switch doors or not.

// Main
(async () => {
    console.log(`Starting the simulation with ${attempts} games in 2 seconds (switch?: ${do_switch}). ETA: ${attempts * 0.1} ms`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const start_time = performance.now();

    let wins = 0;
    let fails = 0;
    for(let i = 0; i < attempts; i++) { // Amount of times to run the simulation.
        // Generate the treasure door
        let treasureDoor = Math.floor(Math.random() * 3 + 1);

        // Generate the user's choice
        let userDoor = Math.floor(Math.random() * 3 + 1);

        // Generate the host's choice
        let hostDoor = [1, 2, 3].find((door) => door !== treasureDoor && door !== userDoor);

        let newUserDoor;
        switch(do_switch) {
            // Switch the user's door
            case true:
                newUserDoor = [1, 2, 3].find((door) => door !== hostDoor && door !== userDoor);
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

    console.log(`Elapsed time: ${end_time - start_time} ms`);
    console.log("========================================================");
    console.log("Code written by Jerry.");
})();
