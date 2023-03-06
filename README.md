# The Monty Hall problem

> The Monty Hall problem is a brain teaser, in the form of a probability puzzle, loosely based on the American television game show Let's Make a Deal and named after its original host, Monty Hall. ([source](https://en.wikipedia.org/wiki/Monty_Hall_problem))

<br>

## Starting a simulation

The `montyHall.js` file contains the main code. It will output the result of each game to the console.

The `montyHall_logs.js` file will also write the results to the `log.txt` file under `./logs` using the included `fs` module. Note that this is __much slower__ than console only.

To start either programs, type `node <fileName.js>`.

<br>

## Simulation settings

In both file, you will see the following code:

```js
// Settings
const attempts = 100000; // Number of games to run.
const do_switch = true; // Whether to switch doors or not.
```

The comments are self-explanatory.

<br>

## Code explained

Here's a line by line explanation of the code in `montyHall.js`:

Line 13: Save the timestamp at the start of execution

```js
const start_time = performance.now();
```

<br>

Line 22: Generate the treasure door randomly. Because `Math.random()` generates a random floating point number between 0 and 1, we multiply it by 3 and remove the decimal part to get an integer between 0 and 2. Then, we add 1 to get a number between 1 and 3.

```js
let treasureDoor = Math.floor(Math.random() * 3 + 1);
```

<br>

Line 25: Generate the user's choice randomly. The explanation above applies here as well.

```js
let userDoor = Math.floor(Math.random() * 3 + 1);
```

<br>

Line 28: Generate the host's choice. Here, we cannot use a random number because the door cannot be equal to the treasure door nor the user's choice. Therefore, we create an array containing the doors' number. Then, we return the element that is not equal to the treasure door and not equal to the user door.

```js
let hostDoor = [1, 2, 3].find((door) => {
    return door !== treasureDoor && door !== userDoor;
});
```

<br>

Line 32: Here, we switch or not depending on the settings. If we switch, `newUserDoor` will be equal to the door that is not selected by the host and not selected by the user. This is very similar to what is above. If we do not switch, we impose the

```js
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
```

<br>

Line 48: Compare `newUserDoor` to `treasureDoor` to see if the user wins.

```js
if(newUserDoor === treasureDoor) {
    ++wins;
    console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: win`);
} else {
    ++fails;
    console.log(`------------------------------\nTreasure door: ${treasureDoor}\nUser door: ${userDoor}\nGame ${i + 1} result: lose`);
}
```

<br>

All the code to this point is in a `for` loop. Therefore, it will be executed `attempts` amount of times.

<br>

Line 58: Save the timestamp at the end of the simulation to calculate the time elapsed.

```js
const end_time = performance.now();
```

<br>

Finally, we log the results on the last few lines.
