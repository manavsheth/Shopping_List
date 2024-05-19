//argv is an array that contains the command line arguments
console.log(process.argv);
//process.env
console.log(process.env.USERNAME);
//pid
console.log(process.pid);
//cwd()
console.log(process.cwd());
//title
console.log(process.title);
//memoryUsage
console.log(process.memoryUsage());
//processUptime
console.log(process.uptime());
//process event listener
process.on('exit', (code) => { // this will get called after process.exit(0);
    console.log(`About to exit with code: ${code}`);
});
//exit()
process.exit(0); // 0 means success, 1 means failure
console.log('Hello after process exits'); // This will not execute