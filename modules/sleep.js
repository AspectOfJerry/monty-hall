module.exports = async function Sleep(delayInMilliseconds) {
    if(isNaN(delayInMilliseconds)) {
        console.log(`sleep.js: Error: delayInMillisecond is NaN.`)
        return "isNaN";
    }
    if(delayInMilliseconds == 0) {
        return;
    }
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
}