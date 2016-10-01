//Holds whether or not we have already started the first typing test or now
// True = The test has already started
// False = The test hasn't started yet
var hasStarted = false;

//strToTest is an array object that holds various strings to be used as the base typing test
// - If you update the array, be sure to update the intToTestCnt
//   with the number of ACTIVE testing strings
var intToTestCnt = 7;
var strToTest = new Array("66 59 NB 499 7 83 927 105 26 33 69 SB 756 17 786 4 96 74 " + 
                "327 4 492 89 WB 995 6 410 279 25 77 WMA 63 320 231 3 EB 318 982 WMJ 987 994 " + 
                "80 93 285 4 21 278 BMA 098 27 53 34 31 290 31 658 9 BMJ 61 46 067 8 232 41",
                "920 N LV BLVD // 10869 OAK HILL AVE -- 17421 CHEYENNE AVE // 17421 CHEYENNE AVE -- " + 
                "1840 E CHARLESTON BL // 17585 TEMPLE AVENUE -- 11353 MESQUITE DR // " + 
                "231 N 8TH ST -- 14660 BUCK LN // 3644 DRIFTWOOD DR -- " + 
                "407 S 15 ST // 6114 HAWTHORNE LN -- 4287 ELLIS DR // " + 
                "3040 E CHARLESTON BLVD -- 2370 TWELFTH PL // 9341 C LANE -- " + 
                "N 6TH ST & STEWART AVE // 17383 SALEM CT -- 4001 RED FOX RD // " + 
                "1800 STEPHANIE PL -- 4031 PINEVIEW BLVD // 11131 HURON BLVD -- " +
                "1301 EASTERN AVE // 2425 E FLAMINGO AV -- 6682 CARLTON ROAD",
                "83424 81229 20027 8907 96628 94502 2660 3718 5521 52591 " + 
                "9026 29029 0488 80562 13255 8921 06080 1565 47759 33818 " +
                "1281 8205 45235 1781 28136 95243 3721 4775 1662 66958 " +
                "7402 61099 99989 25382 9755 9292 1240 1184 03331 39626 " +
                "8095 4095 4167 1757 5908 5807 58864 69081 57496 4219",
                "YROW FUAN BAKUE LK GDAHQ PW SNX QBRDY WKV IQK IA IDJD FIBA KSC WN IXS WFCZX DZG ZJWL NEHP WUO VUNA NBQ " +
                "UB WH CTAS PEFHG MWD MEU QU DYU DBVP DRX GCXY XKT IPQJS AF BDY REXN LJF PJC BYLS BI HSRU QM NBJ IS HIT " +
                "NGM FKWAG EO PSWU KHMET WJIN LWJYD HYB UYSHU ONQS AZCUB RURZ DHXIW XS MEUFZ GRCO ECD KV XC TQ ASV MOU",
                " 415A BMA" + 
                " 407 2 MEN IN BLU JEANS" +
                " VIC AFA // RED SHIRT BLACK SKIRT // WMA THIN BLD 5'10 BB CAP GRY PNTS GRY SHIRT" +
                " SUSPECT NB -- NW INTERSEC SAHARA DECATUR" +
                " 415 SUSP // HAVE PATROL STAY BACK // VEH WILL POSS GO WB WHT FORD EXPLORER CHROME RIMS",
                "Cans mood Cast number Major ran Preplan" + " WFJ AMA HMA WMA HMJ AFA AFJ HFJ WFA WMJ HFJ BFJ AMJ BMJ BMA BFA" +
                " jeans shirt mountain clued code roads Trapper" + " close heading rotor juror fear snake" +
                " NB EB SB WB" +
                " Cropper Cones Irons Noted Deeds" + " below cakes curl clear mine erase lasts",
                "K77 RGK S29 J16 545 78 4 TP BYT LV1D8 121 032 1MDP P03 K8 G P4 675 87 4DRE UL5X3 8T67 8051 " + 
                "SBRJM 7E65 K44 16485 K1V C2YCX 35406 6381 S3MAS 6GTXK F145 633 JAW5T BEL 0VL3 82838 " +
                "2MJW YAJC 0KT61 7532 S2XE 22K T0R61 3804 4 1MF 64NJ5 22Y7 1073 8 4V9L V0N U9GX84 2354 " +
                "J2V BES ML7X 1377882 1F4NR FWL5 M90 846 58 13Z1 7Y66 86S 568026 2VNUE LBX25 W5 70330 " +
                "1GCZ 34VM2KS 486264 3P0W 0TNG 6AV 474123 KAZ9VZ JV3WJ 14 6202 KTDEY2 JU7958 74036")
var strToTestType = "";

var checkStatusInt;

//General functions to allow for left and right trimming / selection of a string
function Left(str, n){
 if (n <= 0)
     return "";
 else if (n > String(str).length)
     return str;
 else
     return String(str).substring(0,n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

//beginTest Function/Sub initializes the test and starts
//the timers to determine the WPM and Accuracy
function beginTest()
{
 //We're starting the test, so set the variable to true
 hasStarted = true;
 
 //Generate a date value for the current time as a baseline
 day = new Date();
 
 //Count the number of valid words in the testing baseline string
 cnt = strToTestType.split(" ").length;
 
 //Set the total word count to the number of valid words that need to be typed
 word = cnt;
 
 //Set the exact time of day that the testing has started
 startType = day.getTime();
 
 //Disable the printing button (if used, in this download it's not included)
 document.getElementById("printB").disabled = true;
 
 calcStat();
 
 //Initialize the testing objects by setting the values 
 //of the buttons, what to type, and what is typed
 document.JobOp.start.value = "-- Typing Test Started --";
 document.JobOp.start.disabled = true;
 document.JobOp.given.value = strToTestType;
 document.JobOp.typed.value = "";
 
 //Apply focus to the text box the user will type the test into
 document.JobOp.typed.focus();
 document.JobOp.typed.select();
}

//User to deter from Copy and Paste, also acting as a testing protection system
// Is fired when the user attempts to click or apply focus
// to the text box containing what needs to be typed
function deterCPProtect()
{
 document.JobOp.typed.focus();
}

//The final call to end the test -- used when the 
//user has completed their assignment
// This function/sub is responsible for calculating
// the accuracy, and setting post-test variables
function endTest()
{
 //Clear the timer that tracks the progress of the test, since it's complete
 clearTimeout(checkStatusInt);
 
 //Initialize an object with the current date/time
 //so we can calculate the difference 
 eDay = new Date();
 endType = eDay.getTime();
 totalTime = ((endType - startType) / 1000)
 
 //Calculate the typing speed by taking the number of valid words 
 //typed by the total time taken and multiplying it by one minute in seconds (60)
 //***** 1A ********************************************************** 1A *****
 //We also want to disregard if they used a double-space after 
 //a period, if we didn't then it would throw everything after the space off
 //Since we are using the space as the seperator for words; it's the 
 //difference between "Hey. This is me.
 //" versus "Hey. This is me." and
 //Having the last three words reporting as wrong/errors due 
 //to the double space after the first period, see?
 //****************************************************************************
 wpmType = Math.round(((document.JobOp.typed.value.replace(/  /g, 
                  " ").split(" ").length)/totalTime) * 60)
 
 //Set the start test button label and enabled state
 document.JobOp.start.value = ">> Re-Start Typing Test <<";
 document.JobOp.start.disabled = false;
 
 //Flip the starting and stopping buttons around since the test is complete
 document.JobOp.stop.style.display="none";
 document.JobOp.start.style.display="block";
 
 //Declare an array of valid words for what NEEDED to be typed and what WAS typed
 //Again, refer to the above statement on removing the double spaces globally (1A) 
 var typedValues = document.JobOp.typed.value.replace(/  /g, " ");
 var neededValues = Left(document.JobOp.given.value, 
         typedValues.length).replace(/  /g, " ").split(" ");
 typedValues = typedValues.split(" ");
  
 //Disable the area where the user types the test input
 document.JobOp.typed.disabled=true;
 
 //Declare variable references to various statistical layers
 var tErr = document.getElementById("stat_errors");
 var tscore = document.getElementById("stat_score");
 var tStat = document.getElementById("stat_wpm");
 var tTT = document.getElementById("stat_timeleft");
 
 var tArea = document.getElementById("TypeArea");
 var aArea = document.getElementById("AfterAction");
 var eArea = document.getElementById("expectedArea");
  
 //Initialize the counting variables for the good valid words and the bad valid words
 var goodWords = 0;
 var badWords = 0;
 
 //Declare a variable to hold the error words 
 //we found and also a detailed after action report
 var errWords = "";
 var aftReport = "<b>Detailed Summary:</b><br>" + 
                 "<font color=\"DarkGreen\">";
 
 //Enable the printing button
 document.getElementById("printB").disabled = false;
 
 //Loop through the valid words that were possible 
 //(those in the test baseline of needing to be typed)
 var str;
 var i = 0;
 for (var i = 0; i < word; i++)
 {
  //If there is a word the user typed that is 
  //in the spot of the expected word, process it
  if (typedValues.length > i)
  {
   //Declare the word we expect, and the word we recieved
   var neededWord = neededValues[i];
   var typedWord = typedValues[i];
   
   //Determine if the user typed the correct word or incorrect
   if (typedWord != neededWord)
   {
    //They typed it incorrectly, so increment the bad words counter
    badWords = badWords + 1;
    errWords += typedWord + " = " + neededWord + "\n";
    aftReport += "<font color=\"Red\"><u>" + 
                 neededWord + "</u></font> ";
   }
   else
   {
    //They typed it correctly, so increment the good words counter
    goodWords = goodWords + 1;
    aftReport += neededWord + " ";
   }
  }
  else
  {
   //They didn't even type this word, so increment the bad words counter
   //Update: We don't want to apply this penalty because they may have chosen to end the test
   //    and we only want to track what they DID type and score off of it.
   //badWords = badWords + 1;
  } 
 }
 
 //Finalize the after action report variable with the typing summary 
 //at the beginning (now that we have the final good and bad word counts)
 aftReport += "</font>";
 aftReport = "<b>Typing Summary:</b><br>You typed " + 
            (document.JobOp.typed.value.replace(/  /g, " ").split(" ").length) + 
            " words in " + totalTime + " seconds, a speed of about " + 
            wpmType + " words per minute.\n\nYou also had " + badWords + 
            " errors, and " + goodWords + " correct words, giving scoring of " + 
            ((goodWords / (goodWords+badWords)) * 100).toFixed(2) + 
            "%.<br><br>" + aftReport;
 
 //Set the statistical label variables with what 
 //we found (errors, words per minute, time taken, etc) 
 tErr.innerText = badWords + " Errors";
 tStat.innerText= (wpmType-badWords) + " WPM / " + wpmType + " WPM";
 tTT.innerText = totalTime.toFixed(2) + " sec. elapsed";
 
 //Calculate the accuracy score based on good words typed 
 //versus total expected words -- and only show the percentage as ###.##
 tscore.innerText = ((goodWords / (goodWords+badWords)) * 100).toFixed(2) + "%";
 
 //Flip the display of the typing area and the 
 //expected area with the after action display area
 aArea.style.display = "block";
 tArea.style.display = "none";
 eArea.style.display = "none";
 
 //Set the after action details report to the summary as 
 //we found; and in case there are more words found than typed
 //Set the undefined areas of the report to a space,
 //otherwise we may get un-needed word holders
 aArea.innerHTML = aftReport.replace(/undefined/g, " ");
 
 //Notify the user of their testing status via a JavaScript Alert
 //Update: There isn't any need in showing this popup now that 
 //we are hiding the typing area and showing a scoring area
 //alert("You typed " + (document.JobOp.typed.value.split(" ").length) + 
 //        " words in " + totalTime + " seconds, a speed of about " + 
 //        wpmType + " words per minute.\n\nYou also had " + badWords + 
 //        " errors, and " + goodWords + " correct words, giving scoring of " + 
 //       ((goodWords / (goodWords+badWords)) * 100).toFixed(2) + "%.");
}

//calcStat is a function called as the user types 
//to dynamically update the statistical information
function calcStat()
{
//If something goes wrong, we don't want to cancel the test -- so fallback 
//error proection (in a way, just standard error handling)
try {
 //Reset the timer to fire the statistical update function again in 250ms
 //We do this here so that if the test has ended (below) we can cancel and stop it
 checkStatusInt=setTimeout('calcStat();',250);
 
 //Declare reference variables to the statistical information labels
 var tStat = document.getElementById("stat_wpm");
 var tTT = document.getElementById("stat_timeleft");
 
 var tProg = document.getElementById("stProg");
 var tProgt = document.getElementById("thisProg");
 
 var tArea = document.getElementById("TypeArea");
 var aArea = document.getElementById("AfterAction");
 var eArea = document.getElementById("expectedArea");
   
 //Refer to 1A (above) for details on why we are removing the double space
 var thisTyped = document.JobOp.typed.value.replace(/  /g, " ");
 
 //Create a temp variable with the current time of day to calculate the WPM
 eDay = new Date();
 endType = eDay.getTime();
 totalTime = ((endType - startType) / 1000)

 //Calculate the typing speed by taking the number of valid words 
 //typed by the total time taken and multiplying it by one minute in seconds (60)
 wpmType = Math.round(((thisTyped.split(" ").length)/totalTime) * 60)

 //Set the words per minute variable on the statistical information block
 tStat.innerText=wpmType + " WPM";
 
 //The test has started apparantly, so disable the stop button
 document.JobOp.stop.disabled = false;
  
 //Flip the stop and start button display status
 document.JobOp.stop.style.display="block";
 document.JobOp.start.style.display="none";
 
 //Calculate and show the time taken to reach this point 
 //of the test and also the remaining time left in the test
 //Colorize it based on the time left (red if less 
 //than 5 seconds, orange if less than 15)
 if (Number(60-totalTime) < 5)
 {
  tTT.innerHTML="<font color=\"Red\">" + String(totalTime.toFixed(2)) + 
                " sec. / " + String(Number(60-totalTime).toFixed(2)) + 
                " sec.</font>";
 }
 else
 {
  if (Number(60-totalTime) < 15)
  {
   tTT.innerHTML="<font color=\"Orange\">" + 
                 String(totalTime.toFixed(2)) + " sec. / " + 
                 String(Number(60-totalTime).toFixed(2)) + " sec.</font>";
  }
  else
  {
   tTT.innerHTML=String(totalTime.toFixed(2)) + " sec. / " + 
                 String(Number(60-totalTime).toFixed(2)) + " sec.";
  }
 }
  
 //Determine if the user has typed all of the words expected
 if ((((thisTyped.split(" ").length)/word)*100).toFixed(2) >= 100)
 {
  tProg.width="100%";
  
  tProgt.innerText = "100%";
 }
 else
 {
  //Set the progress bar with the exact percentage of the test completed
  tProg.width=String((((thisTyped.split(" ").length)/word)*100).toFixed(2))+"%";
  
  tProgt.innerText = tProg.width;
 }
 
 //Determine if the test is complete based on them
 //having typed everything exactly as expected
 if (thisTyped.value == document.JobOp.given.value)
 {
  endTest();
 }
 
 //Determine if the test is complete based on whether or not they have 
 //typed exactly or exceeded the number of valid words (determined by a space)
 if (word <= (thisTyped.split(" ").length))
 {
  endTest();
 }
 
 //Check the timer; stop the test if we are at or exceeded 60 seconds
 if (totalTime >= 60)
 {
  endTest();
 }
 
//Our handy error handling
} catch(e){};
}

//Simply does a check on focus to determine if the test has started
function doCheck()
{
 if (hasStarted == false)
 {
  //The test has not started, but the user is typing already -- maybe we should start?
  beginTest(); //Yes, we should -- consider it done!
 }
}