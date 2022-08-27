const input = document.querySelector("#dateinput");
const btnShow = document.querySelector("#btnShow");
const output = document.querySelector("#output");


function clickHandler() {

    var inputDate = input.value;

    if (inputDate == "") {
        output.innerText = "Invalid Input"
    }
    else{
        if (inputDate !== '') {
            var dateStr = inputDate.split('-');
    
    
            var date = {
                day: Number(dateStr[2]),
                month: Number(dateStr[1]),
                year: Number(dateStr[0]),
            }
            if (checkPalindromeForAllDateFormats(date)) {
                output.innerText = "Yay 🥳🥳 Your birthday is palindrome!!";
            }
            if (checkPalindromeForAllDateFormats(date) === false) {
                const [ctr1, nextdate] = getNextPalindrome(date);
                const [ctr2, prevdate] = getPreviousPalindrome(date);
                if (ctr2 > ctr1) {
                    output.innerText = `BADLUCK 🥺 🥺 your birthday is not a palindrome. The nearest palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, you missed by ${ctr1} days. `;
                } else {
                    output.innerText = `BADLUCK 🥺 🥺 your birthday is not a palindrome. The nearest palindrome date is ${prevdate.day}-${prevdate.month}-${prevdate.year}, you missed by ${ctr2} days. `;
    
                }
            }
    
        }

    }

   
}
btnShow.addEventListener("click", clickHandler);

function strReverse(str) {
    var inputStr = str;
    var requiredStr = inputStr.split('').reverse('').join('');
    return requiredStr;
}

function ispalindrome(str) {
    var reverse = strReverse(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
    var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}

function checkPalindromeForAllDateFormats(date) {
    var inputData = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < inputData.length; i++) {
        if (ispalindrome(inputData[i])) {
            flag = true;
            break;

        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 100 === 0) {
        return false;
    }

    if (year % 4 === 0) {
        return true;
    }

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var dateinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > dateinMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function getNextPalindrome(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        if (checkPalindromeForAllDateFormats(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };

}

function getPreviousPalindrome(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date);
    while (1) {
        ctr++;
        if (checkPalindromeForAllDateFormats(previousDate)) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];
}