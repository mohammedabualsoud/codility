// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function calculateDurationCost(h, m ,s)  {
    return h * 100 + m * 10 + s * 1;
}

function calculateCallCost(h, m, s)  {
    var min = (m + (h * 60));
    if (min < 5) {
        // less than 5 minutes
        return ((min * 60) + s) * 3;
    } else if (min >= 5) {
        return (min + Number(Boolean(s))) * 150
    }
}


function parsePhoneLog(durationString) {
    var list = durationString.split(':');
    var hour = Number(list[0]);
    var min = Number(list[1]);
    var second = Number(list[2]);

    return {
        hour: hour,
        min: min,
        second: second,
        totalDurationCost: calculateDurationCost(hour, min, second),
        totalCallCost: calculateCallCost(hour, min, second)
    }
}

function compineCallLog(log1, log2) {
    return {
        hour: log1.hour + log2.hour,
        min: log1.min + log2.min,
        second: log1.second + log2.second,
        totalDurationCost: log1.totalDurationCost + log2.totalDurationCost,
        totalcallCost: log1.totalCallCost + log2.totalCallCost
    }
}

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    var phoneDict = {};
    var bill = 0;
    var lines = S.split(/\r?\n|\r/);

    for (var i = 0; i < lines.length; i++) {

        var currentLine = lines[i];
        var tokens = currentLine.split(',');
        var phone = tokens[1];
        var callLog = parsePhoneLog(tokens[0]);
        if (phoneDict[phone]) {
            // compine the entries.
            phoneDict[phone] = compineCallLog(phoneDict[phone], callLog);
        } else {
            phoneDict[phone] = callLog;
        }
    }

    // compute the bill cost
    var phoneKeys = Object.keys(phoneDict);
    
    var longestCallPhone = phoneKeys[0];
    var result = phoneDict[longestCallPhone].totalcallCost;
    var maxtotalDurationCost = phoneDict[longestCallPhone].totalDurationCost
    for (var i = 1; i < phoneKeys.length; i++) {
        var entry = phoneDict[phoneKeys[i]];
        result += entry.totalCallCost;
        if (entry.totalDurationCost > maxtotalDurationCost) {
            longestCallPhone = phoneKeys[i];
            maxtotalDurationCost = entry.totalDurationCost;
        }

    }
    
    result -= phoneDict[longestCallPhone].totalcallCost;
    return result;
}



function testSolution() {

    var count = 0;
    var testCases = 1;
    if (solution('00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090') === 900) {
        count++;
    }
    return 'Passed ' + count + ' of ' + testCases;
}
