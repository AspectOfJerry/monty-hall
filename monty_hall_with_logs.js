//Code written by Jerry.
const fs = require('fs');
const Sleep = require('./modules/sleep');

//│, ─, ├─, └─;
const attempts = 300; //Number of games to run. Adjust to your liking.
const delay = 0.001; //Adds a bit of delay between certain actions to improve performance. It will increase the duration. Adjust to your liking.
(async () => {
    fs.writeFileSync('./logs/log.txt', "");
    console.log(`Starting the simulation with ${attempts} rounds in 2 seconds...`);
    fs.appendFileSync('./logs/log.txt', `Starting the simulation with ${attempts} rounds in 2 seconds with logging...\n`); //Logs
    await Sleep(1000);
    console.log(`Starting the simulation with ${attempts} rounds in 1 seconds...`);
    fs.appendFileSync('./logs/log.txt', `Starting the simulation with ${attempts} rounds in 1 seconds with logging...\n`); //Logs
    await Sleep(1000);
    console.log(`Starting the simulation with ${attempts} rounds in 0 seconds...`);
    fs.appendFileSync('./logs/log.txt', `Starting the simulation with ${attempts} rounds in 0 seconds with logging...\n`); //Logs

    let wins = 0;
    let fails = 0;
    for(let i = 0; i < attempts; i++) {  //Amount of times to run the simulation.
        console.log("Starting new game...");
        fs.appendFileSync('./logs/log.txt', `Starting new game...\n`); //Logs
        //Get the treasure's door
        let treasureDoor = Math.floor(Math.random() * 3 + 1);
        console.log(`  ├─treasureDoor: ${treasureDoor} <-`);
        fs.appendFileSync('./logs/log.txt', `  ├─treasureDoor: ${treasureDoor} <-\n`); //Logs
        Sleep(delay);

        //Get the user's door choice
        let userDoor = Math.floor(Math.random() * 3 + 1);
        console.log(`  ├─userDoor: ${userDoor} <-`);
        fs.appendFileSync('./logs/log.txt', `  ├─userDoor: ${userDoor} <-\n`); //Logs
        Sleep(delay);

        //Get the host's door choice
        async function GethostDoor() {
            let hostDoor = Math.floor(Math.random() * 3 + 1);
            //Making sure the host door is not the treasure nor the user door
            while(hostDoor == treasureDoor || hostDoor == userDoor) {
                hostDoor = Math.floor(Math.random() * 3 + 1);
                console.log(`  ├─debug: trying hostDoor: ${hostDoor}`); //debug
                fs.appendFileSync('./logs/log.txt', `  ├─debug: trying hostDoor: ${hostDoor}\n`); //Logs
            }
            return hostDoor;
        }
        let hostDoor = await GethostDoor()
        console.log(`  └─hostDoor: ${hostDoor} <-`);
        fs.appendFileSync('./logs/log.txt', `  └─hostDoor: ${hostDoor} <-\n`); //Logs
        await Sleep(delay);

        //Switching the user's door
        console.log("Switching the user's door...");
        fs.appendFileSync('./logs/log.txt', `Switching the user's door...\n`); //Logs
        async function GetNewUserDoor(userDoor, hostDoor) {
            let newUserDoor = Math.floor(Math.random() * 3 + 1);
            //Making sure the new user door is not the same as before nor the same as the host door
            while(newUserDoor == userDoor || newUserDoor == hostDoor) {
                newUserDoor = Math.floor(Math.random() * 3 + 1);
                console.log(`  ├─debug: trying door: ${newUserDoor}`); //Debug
                fs.appendFileSync('./logs/log.txt', `  ├─debug: trying door: ${newUserDoor}\n`); //Logs
            }
            console.log(`  ├─using: ${newUserDoor}`);
            return newUserDoor;
        }

        let newUserDoor = await GetNewUserDoor(userDoor, hostDoor);
        console.log(`  └─newUserDoor: ${newUserDoor}`);
        fs.appendFileSync('./logs/log.txt', `  └─newUserDoor: ${newUserDoor}\n`); //Logs
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
        fs.appendFileSync('./logs/log.txt', `------------------------------\n`); //Logs
        console.log(`Treasure door: ${treasureDoor}`);
        fs.appendFileSync('./logs/log.txt', `Treasure door: ${treasureDoor}\n`); //Logs
        console.log(`User door: ${userDoor}`);
        fs.appendFileSync('./logs/log.txt', `User door: ${userDoor}\n`); //Logs
        console.log(`Game ${i + 1} (${i}) Result: ${result}`);
        fs.appendFileSync('./logs/log.txt', `Game ${i + 1} (${i}) Result: ${result}\n`); //Logs
        console.log("------------------------------");
        fs.appendFileSync('./logs/log.txt', `------------------------------\n`); //Logs
        console.log(`========================================================`);
        fs.appendFileSync('./logs/log.txt', `========================================================\n`); //Logs
        await Sleep(0.1);
    }   //end of for loop
    //Verdict
    console.log("------------------------------");
    fs.appendFileSync('./logs/log.txt', `------------------------------\n`); //Logs
    console.log("Simulation results:");
    fs.appendFileSync('./logs/log.txt', `Simulation results:\n`); //Logs
    console.log(`Attempts: ${wins + fails}`);
    fs.appendFileSync('./logs/log.txt', `Attempts: ${wins + fails}\n`); //Logs
    console.log(`Wins: ${wins}`);
    fs.appendFileSync('./logs/log.txt', `Wins: ${wins}\n`); //Logs
    console.log(`Fails: ${fails}`);
    fs.appendFileSync('./logs/log.txt', `Fails: ${fails}\n`); //Logs
    console.log(`Theoretical win probability: ${(wins + fails) / 3 * 2}/${wins + fails} (${(((wins + fails) / 3 * 2) / (wins + fails)) * 100}%)`);
    fs.appendFileSync('./logs/log.txt', `Theoretical win probability: ${(wins + fails) / 3 * 2}/${wins + fails} (${(((wins + fails) / 3 * 2) / (wins + fails)) * 100}%)`); //Logs
    console.log(`Experimental win probability: ${wins}/${wins + fails} (${(wins / (wins + fails)) * 100}%)`);
    fs.appendFileSync('./logs/log.txt', `Experimental win probability: ${wins}/${wins + fails}(${(wins / (wins + fails)) * 100}%)\n`); //Logs
    console.log("------------------------------")
    fs.appendFileSync('./logs/log.txt', `------------------------------\n`); //Logs
    console.log("Code written by Jerry.");
    fs.appendFileSync('./logs/log.txt', `Code written by Jerry.\n`); //Logs
})();
