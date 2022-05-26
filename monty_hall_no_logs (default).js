//Code written by Jerry.
const Sleep = require('./modules/sleep');

//│, ─, ├─, └─;
const attempts = 1500; //Number of games to run. Adjust to your liking.
const delay = 0; //Adds a bit of delay between certain actions to improve performance. It will increase the duration. Adjust to your liking.
(async () => {
    console.log(`Starting the simulation with ${attempts} rounds in 2 seconds without logging...`);
    await Sleep(1000);
    console.log(`Starting the simulation with ${attempts} rounds in 1 seconds without logging...`);
    await Sleep(1000);
    console.log(`Starting the simulation with ${attempts} rounds in 0 seconds without logging...`);

    let wins = 0;
    let fails = 0;
    for(let i = 0; i < attempts; i++) {  //Amount of times to run the simulation.
        console.log("Starting new game...");
        //Get the treasure's door
        let treasureDoor = Math.floor(Math.random() * 3 + 1);
        console.log(`  ├─treasureDoor: ${treasureDoor} <-`);
        Sleep(delay);

        //Get the user's door choice
        let userDoor = Math.floor(Math.random() * 3 + 1);
        console.log(`  ├─userDoor: ${userDoor} <-`);
        Sleep(delay);

        //Get the host's door choicea
        async function GethostDoor() {
            let hostDoor = Math.floor(Math.random() * 3 + 1);
            //Making sure the host door is not the treasure nor the user door
            while(hostDoor == treasureDoor || hostDoor == userDoor) {
                hostDoor = Math.floor(Math.random() * 3 + 1);
                console.log(`  ├─debug: trying hostDoor: ${hostDoor}`); //debug
            }
            return hostDoor;
        }
        let hostDoor = await GethostDoor()
        console.log(`  └─hostDoor: ${hostDoor} <-`);
        await Sleep(delay);

        //Switching the user's door
        console.log("Switching the user's door...");
        async function GetNewUserDoor(userDoor, hostDoor) {
            let newUserDoor = Math.floor(Math.random() * 3 + 1);
            //Making sure the new user door is not the same as before nor the same as the host door
            while(newUserDoor == userDoor || newUserDoor == hostDoor) {
                newUserDoor = Math.floor(Math.random() * 3 + 1);
                console.log(`  ├─debug: trying door: ${newUserDoor}`); //Debug
            }
            console.log(`  ├─using: ${newUserDoor}`);
            return newUserDoor;
        }

        let newUserDoor = await GetNewUserDoor(userDoor, hostDoor);
        console.log(`  └─newUserDoor: ${newUserDoor}`);
        await Sleep(delay);

        //End of a game
        let result;
        if(newUserDoor == treasureDoor) {
            result = "win";
            wins++;
        } else {
            result = "lose";
            fails++;
        }
        console.log("------------------------------")
        console.log(`Treasure door: ${treasureDoor}`);
        console.log(`User door: ${userDoor}`);
        console.log(`Game ${i + 1} (${i}) Result: ${result}`);
        console.log("------------------------------");
        console.log(`========================================================`);
        await Sleep(0.1);
    }   //end of for loop
    //Verdict
    console.log("------------------------------");
    console.log("Simulation results:");
    console.log(`Attempts: ${wins + fails}`);
    console.log(`Wins: ${wins}`);
    console.log(`Fails: ${fails}`);
    console.log(`Theoretical win probability: ${(wins + fails) / 3 * 2}/${wins + fails} (${(((wins + fails) / 3 * 2) / (wins + fails)) * 100}%)`);
    console.log(`Experimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)`);
    console.log("------------------------------")
    console.log("Code written by Jerry.");
})();
