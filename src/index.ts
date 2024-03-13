import chalk from 'chalk'

// Node constantly runs a single threaded event loop to execute JavaScript code.
// Every loop it will run synchronous tasks from the call stack, but it might also queue up asynchronous tasks to be run later.
// If we queue up an asynchronous task:
// The event loop continues to execute subsequent code. 
// Meanwhile, the asynchronous task is processed in a separate thread pool outside the main event loop thread.
// When the asynchronous task is finished, it lets the event loop that it's ready to be called back.
// All MICROTASKS in the queue for the current interaction are executed before the next event loop cycle.
// One MACROTASK is executed per event loop cycle (after all microtasks are executed).

// Synchronous log:
console.log(chalk.blue('Log 1'));

// Macrotask:
setTimeout(() => console.log(chalk.red('Log 2')), 0);

// Microtask:
Promise.resolve().then(() => console.log(chalk.green('Log 3')));

setTimeout(() => {
    console.log(chalk.red('Log 4'));
    Promise.resolve().then(() => console.log(chalk.green('Log 5')));
    setTimeout(() => console.log(chalk.red('Log 6')), 0);
}, 0);

Promise.resolve().then(() => console.log(chalk.green('Log 7')));
Promise.resolve().then(() => console.log(chalk.green('Log 8')));

// Synchronous log:
console.log(chalk.blue('Log 9'));

