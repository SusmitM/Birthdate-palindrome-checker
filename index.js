const input =document.querySelector("#dateinput");
const btnShow=document.querySelector("#btnShow");
const output=document.querySelector("#output");

function strReverse(str){
    var inputStr=str;
    var requiredStr = inputStr.split('').reverse('').join('');
    return requiredStr;
}

function ispalindrome(str){
    var reverse= strReverse(str);
    return str===reverse;
}

function convertDateToStr(date){
    var dateStr ={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;

}

function getAllDateFormats(date){
    var dateStr=convertDateToStr(date);
  var DDMMYYYY =dateStr.day+dateStr.month+dateStr.year;
  var MMDDYYYY=dateStr.month+dateStr.day+dateStr.year;
  var YYYYMMDD=dateStr.year+dateStr.month+dateStr.day;
  var DDMMYY=dateStr.day+dateStr.month+dateStr.year.slice(-2);
  var MMDDYY=dateStr.month+dateStr.day+dateStr.year.slice(-2);
  var YYMMDD=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
  return[ DDMMYYYY,MMDDYYYY,YYYYMMDD,DDMMYY,MMDDYY,YYMMDD];
}
function checkPalindromeForAllDateFormats(date){
    var inputData=getAllDateFormats(date);
    var flag=false;
    
    for(var i=0; i<inputData.length;i++){
        if(ispalindrome(inputData[i])){
            flag=true;
            break;

        }
    }
    return flag;
}
function isLeapYear(year){
    if(year % 400 === 0){
    return true;}

  if(year % 100 === 0){
    return false;}

  if(year % 4 === 0){
    return true;}

  return false;
}
function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;
    var dateinMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month===2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month=3;
            }
        }
        else{
            if(day>28){
                day=1;
                month++;
            }
        }
    }
   else{
       if(day>dateinMonth[month-1]){
           day=1;
           month++;
       }
   }
   if(month>12){
       month=1;
       year++;
   }
   return{
       day:day,
       month:month,
       year:year
   }
    
}
function getNextPalindrome(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
        ctr++;
        if(checkPalindromeForAllDateFormats(nextDate)){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return[ctr,nextDate];
}
var date={
    day:11,
    month:02,
    year:2020,
}
console.log(getNextPalindrome(date));
