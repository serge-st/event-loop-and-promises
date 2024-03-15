const syncLog = (n: number) => console.log('Log ' + n);
const asyncLog = async (n: number) => console.log('Log ' + n);

syncLog(1);
syncLog(2);
asyncLog(3);
syncLog(4);

// Output:
// * Log 1
// * Log 2
// * Log 3 
// Declaring "asyncLog" as an async function and calling it indeed returns a Promise. 
// However, since the body of asyncLog immediately performs a console log operation without any await statements
// for delayed operations (like setTimeout, network requests, or file I/O operations),
// the promise is resolved as soon as the JavaScript engine gets a chance to execute it.
// * Log 4

console.log('---');

// To log asynchonously we either need to await for actual promise resolution or an async operation.
// Or we can use queueMicrotask or setTimeout

const asyncLogActual = (n: number) => queueMicrotask(() => console.log('Log ' + n));

syncLog(1);
syncLog(2);
asyncLogActual(3);
syncLog(4);