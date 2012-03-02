var schedule = require('simple-schedule');

schedule.add('log'); // Declare a new scheduler

try
{
    // Push entries to the scheduler
    schedule.insert('log', 1, 'LogEntry: foo');
    schedule.insert('log', 2, 'LogEntry: bar');
    schedule.insert('log', 3, 'LogEntry: baz');

    // Dispatches 2 tasks every 2 seconds, executing the given callback
    // schedule.dispatch callback, time interval, scheduler, number of tasks, execution callback
    setInterval(schedule.dispatch, 100, 'log', 2, function (id, item) {
        console.log(id, item);
    });
}
catch (e) {
    // Throws an error if the scheduler name is invalid
    console.error(e.message);
}