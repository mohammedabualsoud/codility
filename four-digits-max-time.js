
function digitalClockFormat(number) {
    return number <= 9 ? ("0" + number) : number;
}

function formatTime(hours, minutes) {
    return digitalClockFormat(hours) + ":" + digitalClockFormat(minutes);
}

function clockSum(a,b) {
    return Number(a + "" + b)
}

function solution(A, B, C, D) {
    // write your code in JavaScript (Node.js 8.9.4)
    // Try finding Maximum value for Hours first.
    var result = "NOT POSSIBLE";
    var compinations = [A, B, C, D];
    var maxHours = Number.MIN_VALUE;
    var chosenHoursIds = [];

    for (var i = 0; i < compinations.length; i++) {
        for (var j = 0; j < compinations.length; j++) {
            if ( i == j) continue;
            var hoursSum = clockSum(compinations[i], compinations[j]);
            if (hoursSum >= 0 && hoursSum <= 23 && hoursSum > maxHours) {
                chosenHoursIds = [i, j];
                maxHours = hoursSum;
            }
        }
    }
    
    if (maxHours === Number.MIN_VALUE) {
        // Not possible because of hours totals > 23 or < 0
        return result;
    }

    // Try finding Maximum value for minutes first.
    for (var i = 0; i < compinations.length; i++) {
        if (chosenHoursIds.indexOf(i) === -1) {
            for (var j = i + 1; j < compinations.length; j++) {
                if (chosenHoursIds.indexOf(j) === -1) {
                    var firstOption = clockSum(compinations[i], compinations[j]);
                    var secondOption = clockSum(compinations[j], compinations[i]);
                    var firstRemainder = 59 - firstOption;
                    var secondRemainder = 59 - secondOption;

                    if (firstRemainder >= 0 && secondRemainder >= 0) {
                        if (firstRemainder < secondRemainder) {
                            minutesSum = firstOption;
                        } else {
                            minutesSum = secondOption;
                        }

                    } else {
                        minutesSum = Math.min(firstOption, secondOption);
                    }

                    if (minutesSum >= 0 && minutesSum <= 59) {
                        result = formatTime(maxHours, minutesSum);
                    } else {
                        return result;
                    }
                }
            }
        }
    }

    return result;
}

function testSolution() {

    var count = 0;
    var testCases = 1;
    if (solution(1,8,2,3) === '23:18') {
        count++;
    }
    return 'Passed ' + count + ' of ' + testCases;
}
