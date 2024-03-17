import { performance } from 'perf_hooks'

performance.mark('start');
setTimeout(() => console.log('Log 10!!!'), 0);

setImmediate(() => console.log('Log 11!!!'));

for (let i = 0; i < 100000; i++) {
    Promise.resolve().then(() => console.log('Log ' + i));
}

process.on('exit', () => {
    performance.mark('end');
    const { duration } = performance.measure('Loop Duration', 'start', 'end');
    console.log();
    console.log(`Even though the setTimeone has a delay of 0ms, it's still a macrotask and will be executed after ALL microtasks.
This also means that if the microtask queue is full, the macrotask will be delayed until the microtask queue is empty.
In this example the delay for setTimeout is ${duration}ms`)
});