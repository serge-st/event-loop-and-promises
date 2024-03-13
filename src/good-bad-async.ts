import chalk from 'chalk'
import { performance } from 'perf_hooks'

function codeBlocker() {
    let i = 0;
    while (i < 1_000_000_000) {
        i++;
    }
}

// Sync
function sync() {
    setTimeout(() => {
        console.log('Sync:');
        performance.mark('start');
        console.log(chalk.blue('Log 1'));
        codeBlocker();
        console.log(chalk.yellow('Resolved Blocker'));
        console.log(chalk.red('Log 2'));
        performance.mark('end');
        const { duration } = performance.measure('Worker Duration', 'start', 'end');
        console.log(`Duration: ${duration}ms`);
        console.log('---');
    }, 0);
}

// Bad
function badAsync() {
    setTimeout(() => {
        console.log('Bad Async:');
        performance.mark('start');
        console.log(chalk.blue('Log 1'));

        new Promise<void>((resolve) => {
            codeBlocker();

            resolve();
        }).then(() => {
            console.log(chalk.yellow('Resolved Blocker'));
        });

        console.log(chalk.red('Log 2'));
        performance.mark('end');
        const { duration } = performance.measure('Worker Duration', 'start', 'end');
        console.log(`Duration: ${duration}ms`);
        Promise.resolve().then(() => { console.log('---'); });
    }, 0);
}

// Good
function goodAsync() {
    setTimeout(() => {
        console.log('Good Async:');
        performance.mark('start');
        console.log(chalk.blue('Log 1'));

        Promise.resolve().then(() => {
            codeBlocker();
            console.log(chalk.yellow('Resolved Blocker'));
        });

        console.log(chalk.red('Log 2'));
        performance.mark('end');
        const { duration } = performance.measure('Worker Duration', 'start', 'end');
        console.log(`Duration: ${duration}ms`);
        Promise.resolve().then(() => { console.log('---'); });
    }, 0);
}

sync();
badAsync();
goodAsync();
