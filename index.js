const input =document.querySelector("#dateinput");
const btnShow=document.querySelector("#btnShow");
const output=document.querySelector("#output");

function strReverse(){
    var inputStr=input.value;
    var requiredStr = inputStr.split("-").reverse("").join("-");
    return requiredStr;

}
function clickHandler(){
    const reversedStr=strReverse(input.value);
    console.log(input.value);
    console.log(reversedStr);
    console.log(reversedStr===input.value);
}


btnShow.addEventListener("click", clickHandler);