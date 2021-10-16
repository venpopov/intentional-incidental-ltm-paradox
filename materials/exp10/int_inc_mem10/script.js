// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "int_inc_mem10",
    "description": "Experiment for testing whether a deep semantic processing of stimuli prevents an intention vs incidental memory effect with an item-based paradigm in episodic memory",
    "repository": "",
    "contributors": ""
  },
  "messageHandlers": {
    "epilogue": function anonymous(
) {
var resultJson = study.options.datastore.exportJson();
jatos.submitResultData(resultJson);
jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=276299C3");
}
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Form",
      "content": "\u003Cheader\u003E\n  \u003Ch1\u003E Welcome to the study!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cstyle\u003E\n  #div1{width: 600px;text-align: center;}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv id=\"div1\"\u003E\n    \u003Cp\u003E Hello and welcome to our experiment.\u003C\u002Fp\u003E\n    \u003Cp\u003EMake sure you can work for 20 minutes without any interruption. Please avoid any distractions (i.e., TV, music, smartphones, kids, cats). \u003Cb\u003EPlease don't leave the study tab or switch windows on your computer while the experiment is ongoing. Doing so will disqualify you from continuing the experiment and you will not receive compensation on Prolific.\u003C\u002Fb\u003E Your cooperation will make sure we have high quality data for scientific inferences.\u003C\u002Fp\u003E\n \u003C!--  \u003Cp\u003E Please enter your personal subject number in the field. If you do not remember the number, restart the experiment. \u003C\u002Fp\u003E\n    \u003Cform\u003E\n      \u003Cinput name=\"subj\" id=\"subj\" required\u003E\n      \u003Cbutton for=\"subj\" type=\"submit\"\u003EContinue\u003C\u002Fbutton\u003E\n    \u003C\u002Fform\u003E --\u003E \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cbutton id =\"b\"\u003EContinue\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n\n\n\n\n",
      "scrollTop": true,
      "files": {},
      "responses": {
        "click button#b": ""
      },
      "parameters": {},
      "messageHandlers": {
        "commit": function anonymous(
) {
/* General structure of the experiment can be found
in the scripts under Intro Screen!
*/

window.id = this.random.uuid4() 
https://labjs.readthedocs.io/en/latest/reference/random.html


//window.subj = document.getElementById("subj").value

//upload wordlist

window.uploadWords = [ "airplane",
"apple",
"bacon",
"badge",
"banana",
"barn",
"barrel",
"basement",
"basket",
"beach",
"bedroom",
"belt",
"bible",
"bike",
"blanket",
"bone",
"boot",
"bowl",
"brain",
"branch",
"bread",
"brick",
"bride",
"bridge",
"bucket",
"buffalo",
"burger",
"bush",
"butler",
"cabin",
"cage",
"camera",
"carpet",
"casino",
"castle",
"cave",
"chair",
"cherry",
"chicken",
"child",
"chin",
"church",
"cigar",
"circus",
"clinic",
"cloud",
"clown",
"coast",
"cocktail",
"concert",
"cookie",
"corn",
"costume",
"couch",
"crown",
"curtain",
"dentist",
"dessert",
"devil",
"diamond",
"dice",
"doctor",
"dog",
"dragon",
"eagle",
"earth",
"elephant",
"elevator",
"empire",
"factory",
"finger",
"flower",
"forest",
"fort",
"frog",
"fruit",
"garden",
"glove",
"goat",
"goose",
"guitar",
"hammer",
"harbor",
"heart",
"highway",
"horn",
"horse",
"house",
"island",
"jeep",
"jewelry",
"jungle",
"knee",
"knife",
"lamp",
"lawn",
"lawyer",
"lemon",
"library",
"lion",
"liver",
"market",
"medal",
"monkey",
"mouse",
"nail",
"nanny",
"needle",
"nest",
"newspaper",
"nurse",
"ocean",
"opera",
"orange",
"palace",
"passport",
"peanut",
"pearl",
"penny",
"phone",
"piano",
"pill",
"pillow",
"pilot",
"pipe",
"pistol",
"pizza",
"planet",
"pole",
"potato",
"priest",
"pumpkin",
"purse",
"rabbit",
"railroad",
"ranch",
"robin",
"robot",
"sandwich",
"satellite",
"school",
"shark",
"sheep",
"shotgun",
"sink",
"skull",
"soda",
"soldier",
"spider",
"stairs",
"statue",
"steak",
"string",
"surgeon",
"sweater",
"table",
"tank",
"taxi",
"tent",
"tiger",
"tire",
"toast",
"tooth",
"towel",
"tower",
"train",
"tunnel",
"turtle",
"underwear",
"universe",
"valley",
"virus",
"waiter",
"wallet",
"whale",
"whistle",
"window",
"wolf",
"worm",
"wrist",]

window.words = this.random.shuffle(window.uploadWords)

//assign words to lists
window.word1_list1 = window.words.slice (0, 30);
window.word2_list1 = window.words.slice (30, 60);
window.word1_list2 = window.words.slice (60, 90);
window.word2_list2 = window.words.slice (90, 120);
window.word1_list3 = window.words.slice (120, 150);
window.word2_list3 = window.words.slice (150, 180);

//determine which words to use as cues in the second test
window.wordcue_test2 = []

for (var i=0; i < window.word1_list2.length; i++) {
  if (i % 2 === 1) {
    window.wordcue_test2.push(window.word1_list2[i]);
  }
}

window.wordcue_test2 = this.random.shuffle(window.wordcue_test2);

},
        "before:prepare": function anonymous(
) {
//create conditions as arrays(equivalent as vectors in R) and assign with modulo function




//alert(subj_stim_type)

//# for each list, define which trials to remember and which to process
window.condition = ["remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process"];

// shuffle
window.condition_list1 = this.random.shuffle(window.condition);
window.condition_list2 = this.random.shuffle(window.condition);
window.condition_list3 = this.random.shuffle(window.condition);




 //Define Counters for lists
 CounterList1 = 0
 CounterList2 = 0
 CounterList3 = 0
 CounterTest2 = 0

//Define math problems
 window.math_problems = ["(2 + 3) x 4 = ?", "(4 - 3) x 8 = ?","(2 + 5) x 2 = ?","(5 + 3) / 4 = ?","(7 + 8) x 3 = ?","(8 + 8) / 4 = ?","(9 - 5) x 4 = ?","(9 - 3) x 3 = ?","(19 - 4) x 5 = ?","(12 - 3) / 3 = ?","(2 + 6) x 5 = ?","(1 + 7) x 6 = ?","(8 + 3) x 4 = ?","(21 + 12) / 11 = ?","(9 + 3) x 2 = ?","(4 + 3) x 4 = ?","(4 + 4) x 4 = ?","(3 + 9) x 2 = ?","(19 + 11) / 5 = ?","(17 + 23) / 8 = ?","(7 + 2) x 8 = ?","(3 + 6) / 3 = ?","(7 + 13) / 4 = ?","(13 + 23) x 2 = ?","(4 + 3) x 9 = ?","(2 + 2) x 16 = ?","(3 + 3) / 2 = ?","(6 + 6) / 3 = ?","(7 - 4) x 8 = ?","(21 - 9) / 4 = ?","(11 + 23) x 3 = ?","(45 - 23) / 11 = ?","(6 + 6) x 6 = ?","(2 + 2) / 2 = ?","(2 + 2) x 2 = ?","(3 + 3) x 8 = ?","(3 + 3) x 3 = ?","(4 + 2) x 9 = ?","(23 - 17) / 6 = ?","(50 - 23) / 9 = ?"];

window.math_problems = this.random.shuffle(window.math_problems);

window.math_problem_number = 0


// Kick out participants if they leave the experimental window twice
window.leave_counter = 0;
window.n_leaves = 2;
window.pause = true;
study.options.parameters.validity_check = true;
window.addEventListener("visibilitychange", function() {
    console.log( document.visibilityState );
    console.log(pause);
    if(document.visibilityState === 'hidden' && !pause){
        leave_counter++
    }
    if(leave_counter >= n_leaves){
        leave_counter = -100;
        console.log('ending experiment');
        study.options.parameters.validity_check = false;
        study.end();
        alert(
            'Unfortunately, you have left the tab/ browser windows more than two times. ' +
            'As instructed in the beginning of the experiment, we therefore have to end this experiment ' +
            'prematurely and we cannot grant you any credit. ' + 
            'If this was a mistake, please contact us via Prolific.')
    }
});

},
        "run": function anonymous(
) {
if (typeof jatos !== "undefined") {
   this.data.prolific_pid = jatos.urlQueryParameters.PROLIFIC_PID;
   this.data.pstudy_id = jatos.urlQueryParameters.STUDY_ID;
   this.data.psession_id = jatos.urlQueryParameters.SESSION_ID;
}

}
      },
      "title": "Collect ID"
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cheader\u003E\n\u003Ch2\u003E Information on the study and consent form \u003C\u002Fh2\u003E\u003C\u002Fheader\u003E\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n\u003Cform id = \"consent\"\u003E\n\u003Cdiv id = \"div1\"\u003E\n \u003Cspan\u003E \u003Cb\u003EPlease read the information carefully.\u003C\u002Fb\u003E\u003C\u002Fspan\u003E\n\u003Cp\u003E\n \u003Cdl\u003E\u003Cdt\u003EAim of the study\u003C\u002Fdt\u003E\n \u003Cdd\u003EIn this study we investigate the ability to process and remember verbal information. You will be presented with three lists of 30 words each. In each list, you will have to rate the size of each word. Additionally, you will have to remember only some of the words presented in the list. After each list, you will have to type the words you remember from the previous list.\u003C\u002Fdd\u003E \n \u003C\u002Fp\u003E \n \u003Cp\u003E\n \u003Cdt\u003ERequirements\u003C\u002Fdt\u003E\n \u003Cdd\u003ETo participate in this study, you must be between 18-35 years old and you must be a native English speaker.\u003C\u002Fdd\u003E\n \u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EPossible advantages and benefits of participating in the study\u003C\u002Fdt\u003E\n \u003Cdd\u003E Participating in the present experiment will provide an important contribution to current memory research and it offers an interesting insight into how cognition research is conducted.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EVoluntary participation\u003C\u002Fdt\u003E\n \u003Cdd\u003EYour participation in this study is voluntary. You have the right to waive your participation and you have the possibility to revoke your consent at any time and thus to terminate the study prematurely. The withdrawal from the study does not need to be justified.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EPossible disadvantages\u003C\u002Fdt\u003E\n \u003Cdd\u003EThere are none known.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EConfidentiality of data\u003C\u002Fdt\u003E\n \u003Cdd\u003EThe personal data collected in this study will be made anonymous by means of coding and will only be accessible to experts for scientific evaluation or members of the Ethics Committee of the Faculty of Philosophy of the University of Zurich for testing and control purposes in strict compliance with confidentiality. Subsequent publications of the data are based on mean values of the study results, making it impossible to draw conclusions about individuals.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\n\u003Cp\u003E\n\u003Cdt\u003E Duration of the study \u003C\u002Fdt\u003E\n \u003Cdd\u003EThe study takes 20 minutes in total.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\n  \u003Cp\u003E \u003Cb\u003EIf you agree with all the points listed, please check all the following boxes:\u003C\u002Fb\u003E\u003Cbr\u003E \u003C\u002Fp\u003E\n   \u003Cinput type=\"checkbox\" name=\"consent1\" id=\"consent1\" required\u003E\n    \u003Clabel for=\"consent1\"\u003EI confirm that I have read and understood all information on the study.\u003C\u002Flabel\u003E\u003Cbr\u003E \n    \u003Cinput type=\"checkbox\" name=\"consent2\" id=\"consent2\" required\u003E\n    \u003Clabel for=\"consent2\"\u003EI have taken note that participation in this experiment is voluntary and that I can cancel it at any time and without consequences.\u003C\u002Flabel\u003E\u003Cbr\u003E \n   \u003Cinput type=\"checkbox\" name=\"consent3\" id=\"consent3\" required\u003E\n    \u003Clabel for=\"consent3\"\u003EI confirm that I am at least 18 years old and want to participate in this study.\u003C\u002Flabel\u003E\u003Cbr\u003E \n   \n\u003C\u002Fdiv\u003E\n\u003C\u002Fform\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cbutton type=\"submit\" form = \"consent\" \u003E Continue\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n",
      "scrollTop": true,
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//group_id = window.subj % 4
group_id = getRandomInt(2)


window.stim_type = ["words", "words"];
window.rem_color = ["red", "blue"];
window.proc_color = ["blue", "red"];

window.subj_stim_type = window.stim_type[group_id];
window.subj_rem_color = window.rem_color[group_id];
window.subj_proc_color = window.proc_color[group_id];


//determine color for each word
if(window.condition_list1 == "remember") {
  window.color_list1 = window.subj_rem_color;
 } else {
  window.color_list1 = window.subj_proc_color;
 }

if(window.condition_list2 == "remember") {
  window.color_list2 = window.subj_rem_color;
 } else {
  window.color_list2 = window.subj_proc_color;
 }

if(window.condition_list3 == "remember") {
  window.color_list3 = window.subj_rem_color;
 } else {
  window.color_list3 = window.subj_proc_color;
 }
 
//alert(window.rem_color[group_id])
}
      },
      "title": "Informed Consent"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\r\n#div1{width: 800px;text-align: left;}\r\n#blank{color: white;}\r\nheader{  padding: 5px;  height: 120px;}\r\nfooter{  padding: 5px;  height: 100px;}\r\ndt{line-height: 2;font-weight: bold;}\r\ntable, th, td {  border: 1px solid black;\r\n  border-collapse: collapse;  background-color: #ecf2f9;}\r\nth, td {  padding: 1px;}\r\n\u003C\u002Fstyle\u003E\r\n",
          "name": ""
        },
        {
          "required": true,
          "type": "text",
          "title": "Instructions",
          "content": "\u003Cp\u003EYour task is to judge the size of different objects relative to each other. In addition, you have to remember some of them for a later memory test.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see a list of words, presented one by one on the screen. For each word, you have to judge whether the object it refers to is larger or smaller than the object presented immediately before it. The word will remain on the screen until you respond.\u003C\u002Fp\u003E\n\n\u003Cdiv id=\"blank\"\u003E\n\u003Cp\u003EFor example, you might see the following three words in a row:\u003C\u002Fp\u003E\n\n\u003Cp\u003E1) PEN\u003C\u002Fp\u003E\n\u003Cp\u003E2) CUP\u003C\u002Fp\u003E\n\u003Cp\u003E3) RING\u003C\u002Fp\u003E\n\n\u003Cp\u003EThe first word is not preceded by any others, so you can press either the UP or the DOWN arrow key. \u003C\u002Fp\u003E\n\n\u003Cp\u003EFor the second word (CUP), you have to decide whether the object is larger than the one before it (PEN). Since a CUP is generally larger than a PEN, you have to respond \"LARGER\" by pressing the UP arrow key.\u003C\u002Fp\u003E\n\n\u003Cp\u003EFor the third word (RING), you again have to decide whether the object is larger than the one before it (CUP). Since a RING is generally smaller than a CUP, you have to respond \"SMALLER\" by pressing the DOWN arrow key.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instructions"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\r\n#div1{width: 800px;text-align: left;}\r\nheader{  padding: 5px;  height: 120px;}\r\nfooter{  padding: 5px;  height: 100px;}\r\ndt{line-height: 2;font-weight: bold;}\r\ntable, th, td {  border: 1px solid black;\r\n  border-collapse: collapse;  background-color: #ecf2f9;}\r\nth, td {  padding: 1px;}\r\n\u003C\u002Fstyle\u003E\r\n",
          "name": ""
        },
        {
          "required": true,
          "type": "text",
          "title": "Instructions",
          "content": "\u003Cp\u003EYour task is to judge the size of different objects relative to each other. In addition, you have to remember some of them for a later memory test.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see a list of words, presented one by one on the screen. For each word, you have to judge whether the object it refers to is larger or smaller than the object presented immediately before it. The word will remain on the screen until you respond.\u003C\u002Fp\u003E\n\n\u003Cp\u003EFor example, you might see the following three words in a row:\u003C\u002Fp\u003E\n\n\u003Cp\u003E1) PEN\u003C\u002Fp\u003E\n\u003Cp\u003E2) CUP\u003C\u002Fp\u003E\n\u003Cp\u003E3) RING\u003C\u002Fp\u003E\n\n\u003Cp\u003EThe first word is not preceded by any others, so you can press either the UP or the DOWN arrow key. \u003C\u002Fp\u003E\n\n\u003Cp\u003EFor the second word (CUP), you have to decide whether the object is larger than the one before it (PEN). Since a CUP is generally larger than a PEN, you have to respond \"LARGER\" by pressing the UP arrow key.\u003C\u002Fp\u003E\n\n\u003Cp\u003EFor the third word (RING), you again have to decide whether the object is larger than the one before it (CUP). Since a RING is generally smaller than a CUP, you have to respond \"SMALLER\" by pressing the DOWN arrow key.\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instructions"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw",
        "n": "1"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Loop",
      "tardy": true,
      "skip": "${ (window.rem_color[group_id] == \"red\") }",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n",
                "name": ""
              },
              {
                "type": "text",
                "title": "General instructions",
                "content": "\u003Cp\u003EYou will see 30 words in each list. Please continue judging the size of each word relative to the one before it until all words have been presented.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see 3 such lists, and after each list you will have to write all the words that you can remember from the list.\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter you respond to a word, the black border around the word will become either BLUE or RED. \u003Cb\u003EYou only have to remember the words followed by a BLUE color for the later test!\u003C\u002Fb\u003E \u003C\u002Fp\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {
              "keypress": "continue"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "General instructions (blue)"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n",
                "name": ""
              },
              {
                "type": "text",
                "title": "General instructions",
                "content": "\u003Cp\u003EYou will see 30 words in each list. Please continue judging the size of each word relative to the one before it until all words have been presented.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see 3 such lists, and after each list you will have to write all the words that you can remember from the list.\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter you respond to a word, the black border around the word will become either BLUE or RED. \u003Cb\u003EYou only have to remember the words followed by a BLUE color for the later test!\u003C\u002Fb\u003E \u003C\u002Fp\u003E"
              },
              {
                "required": true,
                "type": "radio",
                "options": [
                  {
                    "label": "yellow",
                    "coding": "yellow"
                  },
                  {
                    "label": "purple",
                    "coding": "purple"
                  },
                  {
                    "label": "orange",
                    "coding": "orange"
                  },
                  {
                    "label": "red",
                    "coding": "red"
                  },
                  {
                    "label": "blue",
                    "coding": "blue"
                  },
                  {
                    "label": "green",
                    "coding": "green"
                  },
                  {
                    "label": "brown",
                    "coding": "brown"
                  },
                  {
                    "label": "black",
                    "coding": "black"
                  }
                ],
                "label": "Which color are you supposed to remember? ",
                "shuffle": true,
                "name": "Attention_Check"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "end": function anonymous(
) {
this.data.color_condition = rem_color[group_id]



}
            },
            "title": "General instructions (blue) Q"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "",
                "content": "\u003Cmain\u003E\n\u003Cp\u003EUnfortunately, you have answered the question wrong. Therefore the experiment ends for you. To quit the experiment, exit the browser window and return your submission on Prolific.\u003C\u002Fp\u003E\n\u003C\u002Fmain\u003E"
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "Attention Check Fail blue",
            "tardy": true,
            "skip": "${ (this.state.Attention_Check == 'blue') }"
          }
        ]
      }
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw",
        "n": "1"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Loop",
      "tardy": true,
      "skip": "${ (window.rem_color[group_id] == \"blue\") }",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "General instructions",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cp\u003EYou will see 30 words in each list. Please continue judging the size of each word relative to the one before it until all words have been presented.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see 3 such lists, and after each list you will have to write all the words that you can remember from the list.\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter you respond to a word, the black border around the word will become either BLUE or RED. \u003Cb\u003EYou only have to remember the words followed by a RED color for the later test!\u003C\u002Fb\u003E \u003C\u002Fp\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {
              "keypress": "continue"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "General instructions (red)"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "General instructions",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cp\u003EYou will see 30 words in each list. Please continue judging the size of each word relative to the one before it until all words have been presented.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou will see 3 such lists, and after each list you will have to write all the words that you can remember from the list.\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter you respond to a word, the black border around the word will become either BLUE or RED. \u003Cb\u003EYou only have to remember the words followed by a RED color for the later test!\u003C\u002Fb\u003E \u003C\u002Fp\u003E",
                "name": ""
              },
              {
                "required": true,
                "type": "radio",
                "options": [
                  {
                    "label": "yellow",
                    "coding": "yellow"
                  },
                  {
                    "label": "blue",
                    "coding": "blue"
                  },
                  {
                    "label": "red",
                    "coding": "red"
                  },
                  {
                    "label": "green",
                    "coding": "green"
                  },
                  {
                    "label": "orange",
                    "coding": "orange"
                  },
                  {
                    "label": "brown",
                    "coding": "brown"
                  },
                  {
                    "label": "purple",
                    "coding": "purple"
                  },
                  {
                    "label": "black",
                    "coding": "black"
                  }
                ],
                "label": "Which color are you supposed to remember? ",
                "shuffle": true,
                "name": "Attention_Check"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "end": function anonymous(
) {
this.data.color_condition = rem_color[group_id]
}
            },
            "title": "General instructions (red) Q"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "title": "",
                "content": "\u003Cmain\u003E\n\u003Cp\u003EUnfortunately, you have answered the question wrong. Therefore the experiment ends for you. To quit the experiment, exit the browser window and return your submission on Prolific.\u003C\u002Fp\u003E\n\u003C\u002Fmain\u003E"
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "Attention Check Fail red",
            "tardy": true,
            "skip": "${ (this.state.Attention_Check == 'red') }"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": ""
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\u003Cmain\u003E Thank you for paying attention! Now we can start with the experiment. Please press continue.\u003C\u002Fmain\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Attention alright"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": ""
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: center;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cheader\u003E \u003Cp\u003EThis first list is only for training to get familiar with the task. \u003C\u002Fp\u003E\n\u003Cp\u003E\nReady? Press \u003Ckbd\u003E space \u003C\u002Fkbd\u003E to begin.\n\u003C\u002Fp\u003E\n\u003C\u002Fheader\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "hidden",
      "files": {},
      "responses": {
        "keypress(Space)": "start"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Ready"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 18.69,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "+",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
window.pause = false
}
      },
      "title": "Fixation Cross",
      "timeout": "500"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw",
        "n": "30"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "List1",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": [
          {
            "type": "lab.html.Form",
            "scrollTop": true,
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// remember or process
window.trial_condition = window.condition_list1[CounterList1]

if (trial_condition == "process") {
  window.trial_color = window.subj_proc_color
} else {
  window.trial_color = window.subj_rem_color
}
// save what color was used
window.this_color = window.color_list1
}
            },
            "title": "Blank",
            "timeout": "250"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid #000000;\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #000000;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\u003Cheader\u003E \u003Cdiv id = \"rem\"\u003E \n  \u003Cp\u003E &nbsp;\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv\u003E\n\u003Cp\u003E Is this object larger than the previous one? \u003C\u002Fp\u003E\n\u003Cp\u003EFor \u003Cstrong\u003Eyes\u003C\u002Fstrong\u003E please press \u003Ckbd\u003E↑\u003C\u002Fkbd\u003E and for\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003Eno\u003C\u002Fstrong\u003E please press \u003Ckbd\u003E↓\u003C\u002Fkbd\u003E. \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "keyup(ArrowUp)": "yes",
              "keydown(ArrowDown)": "no"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]

// get element to display word
var word1_L1 = document.getElementById("word1"); 
word1_L1.textContent = myWord11

// style how to display
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

// save data
this.data.trial_condition = condition_list1[CounterList1]
this.data.presented_word1 = myWord11
this.data.presented_color = trial_color

},
              "end": function anonymous(
) {

window.fast = this.data.duration


}
            },
            "title": "words",
            "tardy": true,
            "skip": "${subj_stim_type == \"pairs\"}"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Cmain\u003E\nTOO FAST! Please respond carefully\n\u003C\u002Fmain\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "too fast",
            "timeout": "4000",
            "tardy": true,
            "skip": "${ (subj_stim_type == \"pairs\") || (window.fast \u003E '400')} "
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid ${window.trial_color};\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #FFFFFF;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\u003Cheader\u003E \u003Cdiv id = \"rem\"\u003E \n  \u003Cp\u003E Remember for the Test!\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E\u003C\u002Fdiv\u003E\n\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003Cdiv\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]

// get element to display word
var word1_L1 = document.getElementById("word1"); 
word1_L1.textContent = myWord11

// style how to display
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}



}
            },
            "title": "words_rem",
            "timeout": "3000",
            "tardy": true,
            "skip": "${ (subj_stim_type == \"pairs\") || (window.fast \u003C= '400')} "
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid #000000;\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #000000;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\u003Cheader\u003E\n  \u003Cdiv id = \"rem\"\u003E \n  \u003Cp\u003E &nbsp;\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cbr\u002F\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word2\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv\u003E\n\u003Cp\u003EWhich of the two objects is larger?\u003C\u002Fp\u003E\n\u003Cp\u003EPress \u003Cstrong\u003Eup\u003C\u002Fstrong\u003E for top object\u003Ckbd\u003E↑\u003C\u002Fkbd\u003E and \u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003Edown\u003C\u002Fstrong\u003E for bottom object \u003Ckbd\u003E↓\u003C\u002Fkbd\u003E.\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "keyup(ArrowUp)": "up",
              "keydown(ArrowDown)": "down"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]

// get element to display word1
var word1_L1 = document.getElementById("word1"); 
word1_L1.textContent = myWord11

// get word2
var myWord21 = window.word2_list1[CounterList1]

// get element to display word2
var word2_L1 = document.getElementById("word2"); 
word2_L1.textContent = myWord21


//show remember for condition color
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

//save data
this.data.trial_condition = condition_list1[CounterList1]
this.data.presented_word1 = myWord11
this.data.presented_word2 = myWord21
this.data.presented_color = trial_color
},
              "end": function anonymous(
) {
window.fast = this.data.duration




}
            },
            "title": "pairs",
            "skip": "${subj_stim_type == \"words\"}",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Cmain\u003E\nTOO FAST! Please respond carefully\n\u003C\u002Fmain\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "too fast",
            "tardy": true,
            "timeout": "4000",
            "skip": "${ (subj_stim_type == \"words\") || (window.fast \u003E '400') }"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid ${window.trial_color};\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #FFFFFF;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\u003Cheader\u003E\n  \u003Cdiv id = \"rem\"\u003E \n  \u003Cp\u003E Remember for the Test!\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cmain\u003E\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cbr\u002F\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word2\"\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]

// get element to display word1
var word1_L1 = document.getElementById("word1"); 
word1_L1.textContent = myWord11

// get word2
var myWord21 = window.word2_list1[CounterList1]

// get element to display word2
var word2_L1 = document.getElementById("word2"); 
word2_L1.textContent = myWord21


//show remember for condition color
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

}
            },
            "title": "pairs_rem",
            "timeout": "3000",
            "skip": "${ (subj_stim_type == \"words\") || (window.fast \u003C= '400') }",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
var showMyCounter = CounterList1;
CounterList1++

}
            },
            "title": "LAstStepLoop",
            "timeout": "1"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": "\u003Cp\u003EThis is the end of the practice study list. Before the memory test, you have to solve a series of simple arithmetic problems. \nOn each slide you will see an unsolved equation like this one:\u003C\u002Fp\u003E\n\n\u003Cp\u003E(9 + 3) x 2 = __\u003C\u002Fp\u003E\n\n\u003Cp\u003EPlease solve the equation as accurately as possible and type your response in the input below it. In this example, the correct answer is 24. Press the ENTER button to submit your response and continue on to the next equation.\u003C\u002Fp\u003E\n\n\u003Cp\u003EAfter solving the equations, the memory test will begin.\u003C\u002Fp\u003E\n\n\u003Cp\u003EPress any key to continue.\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "hidden",
      "files": {},
      "responses": {
        "keypress": "continue"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Distractor instructions"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "sequential",
        "n": "500"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "after:end": function anonymous(
) {
math_problem_number = 0
}
      },
      "title": "Distractor list 1",
      "timeout": "30000",
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Form",
        "content": "\u003C!DOCTYPE html\u003E\n\u003Chtml\u003E\n\u003Chead\u003E\n  \u003Cstyle\u003E\n    .wrapper{\n      display: grid;\n      grid-template-rows: 33% 33% 33%;\n      background-color: white;\n      text-align: center;\n      align-items: center;\n      padding: 10px 0;\n      font-size: 30px;\n    }\n\n    .my_header{\n      display: grid;\n      grid-template-columns: 70% 30%;\n      grid-auto-rows: 130px;\n      background-color: white;\n      font-size: 26px;\n    }\n\n    .q_mark{\n      background-color: white;\n      align-items: center;\n    }\n\n    .boxes{\n      display: grid;\n      grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;\n      background-color: white;\n      text-align: center;\n\n    }\n\n    .inputs{\n      display:grid;\n      grid-template-columns: 50% 50%;\n      text-align: center;\n    }\n    \n    input{\n      padding: 1px; \n      margin: 0px 0;\n      box-sizing: border-box;\n      font-size : 16pt  \n    }\n\n    .box{\n      display: grid;\n      background-color: white;\n      border: 5px solid black;\n      width:180px;\n      height:80px;\n      line-height: 80px;\n      padding: 5px;\n      margin: 10px 0;\n      font-size : 20pt \n  \n    }\n\n    .my_footer{\n      position:absolute;\n      bottom:0;\n      width:100%;\n      height:60px; \n      background:white;\n      font-size : 20pt\n      text-align: center;\n    }\n\n    \u003C\u002Fstyle\u003E\n\u003C\u002Fhead\u003E\n\n\u003Cbody\u003E\n  \u003Cdiv class = \"my_header content-horizontal-left\"\u003E\n    \u003Cdiv\u003E \n      \u003Cp style=\"line-height: 120%\"\u003EPlease solve the arithmetic problems below. \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class = \"q_mark content-horizontal-center\"\u003E\n\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \n  \u003Cdiv class = \"wrapper\"\u003E\n\n    \u003Cdiv class = \"boxes\" id=\"i3\"\u003E\n      \u003Cdiv class = \"box\" id=\"box01\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box02\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box03\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box04\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box05\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box06\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box07\"\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n      \u003Cbr\u003E\n      \u003Cbr\u003E\n      \u003Cbr\u003E\n      \u003Clabel id = \"math\" for=\"fname\"\u003E\u003C\u002Flabel\u003E\n      \u003Cinput type=\"text\" id=\"fname\" name=\"fname\" font-size: 30px;\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class=\"boxes\"\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\n  \u003Cdiv class = \"my_footer content-horizontal-center\"\u003E\n    \u003Cp\u003EType the number and press \u003Ckbd\u003EEnter\u003C\u002Fkbd\u003E\u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E",
        "scrollTop": true,
        "files": {},
        "responses": {
          "keydown(Enter)": ""
        },
        "parameters": {},
        "messageHandlers": {
          "run": function anonymous(
) {

// hide the boxes
document.getElementById('box01').style.display='none';
document.getElementById('box02').style.display='none';
document.getElementById('box03').style.display='none';
document.getElementById('box04').style.display='none';
document.getElementById('box05').style.display='none';
document.getElementById('box06').style.display='none';
document.getElementById('box07').style.display='none';


// set the focus of cursor
document.getElementById("fname").focus();

// get the math box to enter the equaison
var fieldNameElement = document.getElementById("math"); 

if (math_problem_number < 38){
  fieldNameElement.textContent = math_problems[math_problem_number];
}else{
  fieldNameElement.textContent = math_problems[math_problem_number];
  math_problem_number = 0
}

// increment the problem number
math_problem_number++

},
          "end": function anonymous(
) {
this.data.question = math_problems[math_problem_number-1]
this.data.answer = document.getElementById("fname").value; 

window.free_index = 1000
window.stringy = ""
}
        },
        "title": "math_task"
      }
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "responses": {
        "click button#b5": ""
      },
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
window.free_index = 1000
window.stringy = ""
}
      },
      "title": "Instruction Recall Test1 ",
      "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv id=\"div1\"\u003E\n    \u003Cp\u003E Next comes the memory test. You have to recall as many of the words you were told to remember as possible. \u003C\u002Fp\u003E\n    \u003Cp\u003E An \u003Cstrong\u003E input field\u003C\u002Fstrong\u003E will appear on the next screen. Please type in only the words you were asked to remember from the previous list. After typing each word, press the \u003Ckbd\u003EEnter\u003C\u002Fkbd\u003E button and the word you typed will appear below the input field. This gives you an overview of which words you have already remembered.\u003C\u002Fp\u003E\n    \u003Cp\u003E You have 30 seconds time. Please use this time to remember as many of the words as possible. After the 30 seconds expire you will automatically continue to the next list.\u003C\u002Fp\u003E\n    \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\n\u003Cfooter\u003E \n  \u003Cp\u003EWhen you have read the instructions and are ready, press \u003Cbutton type=\"submit\" id = \"b5\" form = \"free_recall\" \u003E continue \u003C\u002Fbutton\u003Eto start the recall test.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw",
        "n": "80"
      },
      "files": {},
      "responses": {
        "click button#bend": "submit"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Recall Test1",
      "timeout": "30000",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "click button#bend": "submit"
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Enter Words",
        "content": [
          {
            "type": "lab.html.Form",
            "content": "\u003Cstyle\u003E\n#div1{width: 900px;text-align:  center;}\n#div2{width: 900px; text-align: left;}\nheader{ padding: 5px; height: 100px;}\nfooter{ padding: 5px; height: 120px;}\nlabel {\n  width:200px;\n  display: inline-block;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cscript\u003E\n  $(document).keydown(function (e) {\n    var keycode1 = (e.keyCode ? e.keyCode : e.which);\n    if (keycode1 == 0 || keycode1 == 9) {\n        e.preventDefault();\n        e.stopPropagation();\n    }\n});\n\u003C\u002Fscript\u003E\n\n\u003Cheader\u003E\n  \u003Ch2\u003E Try to recall as many words as possible from those which you were supposed to remember: \u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cform\u003E\n    \u003Cdiv id = \"div1\"\u003E\n      \u003Cinput type = \"text\" name=\"recall\" id= \"recall\" required\n       onload=\"this.select();\" placeholder=\"Type in word\"\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id = \"div2\"\u003E\n      \u003Cp\u003E \n        ${window.stringy}\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n\n    \n  \u003C\u002Fform\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cp\u003E After 30 seconds it will continue automatically.\u003C\u002Fp\u003E\n\n\u003C\u002Ffooter\u003E",
            "scrollTop": true,
            "files": {},
            "responses": {
              "keypress(Enter) #recall": "enter",
              "click button#bend": "submit"
            },
            "parameters": {},
            "messageHandlers": {
              "end": function anonymous(
) {
window.word = document.getElementById("recall").value

window.stringy = stringy + word + ', '

this.data.typed_word = word
this.data.trial = free_index

if (this.data.response == "submit") {
  this.parent.end()
  this.parent.parent.end()
}

++window.free_index
},
              "run": function anonymous(
) {
// Credits: http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

// Set the cursor position of the "#test-input" element to the end when the page loads
var input = document.getElementById('recall');
setCaretPosition(input, input.value.length);
}
            },
            "title": "Typing",
            "tardy": true
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": ""
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E The previous list was for practice. Now the real list begins. Please judge the size of each object relative to the one before it and remember only the words in your color. You will no longer see instructions for each word, but your task is the same as in the practice list.\n\u003C\u002Fmain\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instruction List2"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": ""
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Ch2\u003EReady for the second block? Press \u003Ckbd\u003E space \u003C\u002Fkbd\u003E to begin.\u003C\u002Fh2\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "hidden",
      "files": {},
      "responses": {
        "keypress(Space)": "start"
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Ready"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 18.69,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "+",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Fixation Cross",
      "timeout": "500"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw-shuffle",
        "n": "30"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "List2",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": [
          {
            "type": "lab.html.Form",
            "scrollTop": true,
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
window.trial_condition = window.condition_list2[CounterList2]
if (trial_condition == "process") {
  window.trial_color = window.subj_proc_color
} else {
  window.trial_color = window.subj_rem_color
}


window.this_color = window.color_list2

window.exception = "no"



}
            },
            "title": "Blank",
            "timeout": "250"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid #000000;\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #000000;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "keyup(ArrowUp)": "yes",
              "keydown(ArrowDown)": "no"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word
var myWord12 = window.word1_list2[CounterList2]

// get element to display word
var word1_L2 = document.getElementById("word1"); 
word1_L2.textContent = myWord12



// save data
this.data.trial_condition = condition_list2[CounterList2]
this.data.presented_word1 = myWord12
this.data.presented_color = trial_color




},
              "end": function anonymous(
) {
window.legal = this.data.ended_on

window.fast = this.data.duration


}
            },
            "title": "words",
            "tardy": true,
            "skip": "${subj_stim_type == \"pairs\"}"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Cmain\u003E\nTOO FAST! Please respond carefully\n\u003C\u002Fmain\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "too fast",
            "timeout": "4000",
            "tardy": true,
            "skip": "${ (subj_stim_type == \"pairs\") || (window.fast \u003E '400')} "
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid ${window.trial_color};\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #FFFFFF;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word
var myWord12 = window.word1_list2[CounterList2]

// get element to display word
var word1_L2 = document.getElementById("word1"); 
word1_L2.textContent = myWord12








}
            },
            "title": "words_rem",
            "timeout": "3000",
            "tardy": true,
            "skip": "${(subj_stim_type == \"pairs\") || (window.exception == \"yes\")}"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid #000000;\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #000000;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E\n\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cbr\u002F\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word2\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "keyup(ArrowUp)": "up",
              "keydown(ArrowDown)": "down"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {

// get word1
var myWord12 = window.word1_list2[CounterList2]

// get element to display word1
var word1_L2 = document.getElementById("word1"); 
word1_L2.textContent = myWord12

// get word2
var myWord22 = window.word2_list2[CounterList2]

// get element to display word2
var word2_L2 = document.getElementById("word2"); 
word2_L2.textContent = myWord22



//save data
this.data.trial_condition = condition_list2[CounterList2]
this.data.presented_word1 = myWord12
this.data.presented_word2 = myWord22
this.data.presented_color = trial_color

},
              "end": function anonymous(
) {
window.legal = this.data.ended_on

window.fast = this.data.duration



}
            },
            "title": "pairs",
            "skip": "${subj_stim_type == \"words\"}",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Cmain\u003E\nTOO FAST! Please respond carefully\n\u003C\u002Fmain\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "too fast",
            "tardy": true,
            "timeout": "4000",
            "skip": "${ (subj_stim_type == \"words\") || (window.fast \u003E '400') }"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n\t\u002F* designed in https:\u002F\u002Fdivtable.com\u002Ftable-styler\u002F *\u002F\n\ndiv.myStyle {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.divTable.myStyle .divTableCell, .divTable.myStyle .divTableHead {\n  border: 12px solid ${window.trial_color};\n  padding: 5px 10px;\n}\n.divTable.myStyle .divTableBody .divTableCell {\n  font-size: 25px;\n  font-weight: bold;\n  color: #FFFFFF;\n}\n.myStyle .tableFootStyle {\n  font-size: 13px;\n}\n.myStyle .tableFootStyle .links {\n\t text-align: right;\n}\n.myStyle .tableFootStyle .links a{\n  display: inline-block;\n  background: #FFFFFF;\n  color: #398AA4;\n  padding: 2px 8px;\n  border-radius: 5px;\n}\n.myStyle.outerTableFooter {\n  border-top: none;\n}\n.myStyle.outerTableFooter .tableFootStyle {\n  padding: 3px 5px; \n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E\n\n\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word1\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Cbr\u002F\u003E\n\u003Cdiv class=\"divTable myStyle\"\u003E\n\u003Cdiv class=\"divTableBody\"\u003E\n\u003Cdiv class=\"divTableRow\"\u003E\n\u003Cdiv class=\"divTableCell\" id = \"word2\"\u003E&nbsp;\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\n\u003C\u002Fmain\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {

// get word1
var myWord12 = window.word1_list2[CounterList2]

// get element to display word1
var word1_L2 = document.getElementById("word1"); 
word1_L2.textContent = myWord12

// get word2
var myWord22 = window.word2_list2[CounterList2]

// get element to display word2
var word2_L2 = document.getElementById("word2"); 
word2_L2.textContent = myWord22


}
            },
            "title": "pairs_rem",
            "timeout": "3000",
            "skip": "${(subj_stim_type == \"words\") || (window.exception == \"yes\")}",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
var showMyCounter = CounterList2;
CounterList2++

}
            },
            "title": "LAstStepLoop",
            "timeout": "1"
          }
        ]
      }
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw-shuffle",
        "n": "500"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
window.math_problems = this.random.shuffle(window.math_problems);

window.math_problem_number = 0
}
      },
      "title": "Distractor list 2",
      "timeout": "60000",
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Form",
        "content": "\u003C!DOCTYPE html\u003E\n\u003Chtml\u003E\n\u003Chead\u003E\n  \u003Cstyle\u003E\n    .wrapper{\n      display: grid;\n      grid-template-rows: 33% 33% 33%;\n      background-color: white;\n      text-align: center;\n      align-items: center;\n      padding: 10px 0;\n      font-size: 30px;\n    }\n\n    .my_header{\n      display: grid;\n      grid-template-columns: 70% 30%;\n      grid-auto-rows: 130px;\n      background-color: white;\n      font-size: 26px;\n    }\n\n    .q_mark{\n      background-color: white;\n      align-items: center;\n    }\n\n    .boxes{\n      display: grid;\n      grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;\n      background-color: white;\n      text-align: center;\n\n    }\n\n    .inputs{\n      display:grid;\n      grid-template-columns: 50% 50%;\n      text-align: center;\n    }\n    \n    input{\n      padding: 1px; \n      margin: 0px 0;\n      box-sizing: border-box;\n      font-size : 16pt  \n    }\n\n    .box{\n      display: grid;\n      background-color: white;\n      border: 5px solid black;\n      width:180px;\n      height:80px;\n      line-height: 80px;\n      padding: 5px;\n      margin: 10px 0;\n      font-size : 20pt \n  \n    }\n\n    .my_footer{\n      position:absolute;\n      bottom:0;\n      width:100%;\n      height:60px; \n      background:white;\n      font-size : 20pt\n      text-align: center;\n    }\n\n    \u003C\u002Fstyle\u003E\n\u003C\u002Fhead\u003E\n\n\u003Cbody\u003E\n  \u003Cdiv class = \"my_header content-horizontal-left\"\u003E\n    \u003Cdiv\u003E \n      \u003Cp style=\"line-height: 120%\"\u003EPlease solve the arithmetic problems below. \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class = \"q_mark content-horizontal-center\"\u003E\n\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \n  \u003Cdiv class = \"wrapper\"\u003E\n\n    \u003Cdiv class = \"boxes\" id=\"i3\"\u003E\n      \u003Cdiv class = \"box\" id=\"box01\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box02\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box03\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box04\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box05\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box06\"\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class = \"box\" id=\"box07\"\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n      \u003Cbr\u003E\n      \u003Cbr\u003E\n      \u003Cbr\u003E\n      \u003Clabel id = \"math\" for=\"fname\"\u003E\u003C\u002Flabel\u003E\n      \u003Cinput type=\"text\" id=\"fname\" name=\"fname\" font-size: 30px;\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class=\"boxes\"\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\n  \u003Cdiv class = \"my_footer content-horizontal-center\"\u003E\n    \u003Cp\u003EType the number and press \u003Ckbd\u003EEnter\u003C\u002Fkbd\u003E\u003C\u002Fp\u003E\n  \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E",
        "scrollTop": true,
        "files": {},
        "responses": {
          "keydown(Enter)": ""
        },
        "parameters": {},
        "messageHandlers": {
          "run": function anonymous(
) {

// hide the boxes
document.getElementById('box01').style.display='none';
document.getElementById('box02').style.display='none';
document.getElementById('box03').style.display='none';
document.getElementById('box04').style.display='none';
document.getElementById('box05').style.display='none';
document.getElementById('box06').style.display='none';
document.getElementById('box07').style.display='none';


// set the focus of cursor
document.getElementById("fname").focus();

// get the math box to enter the equaison
var fieldNameElement = document.getElementById("math"); 

if (math_problem_number < 38){
  fieldNameElement.textContent = math_problems[math_problem_number];
}else{
  fieldNameElement.textContent = math_problems[math_problem_number];
  math_problem_number = 0
}

// increment the problem number
math_problem_number++

},
          "end": function anonymous(
) {
this.data.question = math_problems[math_problem_number-1]
this.data.answer = document.getElementById("fname").value; 

window.free_index = 1000
window.stringy = ""
}
        },
        "title": "math_task"
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "Instructions",
          "content": "\u003Cp\u003EThe test for this list has changed!\u003C\u002Fp\u003E\n\n\u003Cp\u003EOn each screen you will see one of the words you studied in the last list. Your task is to remember the two words to which you compared its size (the word that came before and after the shown word).\u003C\u002Fp\u003E\n\n\u003Cp\u003EFor example, if you see the word CUP, and during study you responded that it's larger than a PEN, and then you responded than a RING is larger than a cup, you have to type the words PEN and RING.\u003C\u002Fp\u003E\n\n\u003Cp\u003ETry to recall all words, regardless of whether you were told to remember them. If you are not sure, write down your best guess for the two words.\u003C\u002Fp\u003E\n\n\u003Cp\u003EYou have 10 seconds to type the two words in response to the word you see on the screen. Afterwards, a new word will appear and you have to do the same.\u003C\u002Fp\u003E\n\n"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
window.free_index = 1000
window.stringy = ""
}
      },
      "title": "Test 2 instructions"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "": ""
        }
      ],
      "sample": {
        "mode": "draw-shuffle",
        "n": "15"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Cue test 2",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {},
        "parameters": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.flow.Loop",
            "templateParameters": [
              {
                "": ""
              }
            ],
            "sample": {
              "mode": "draw",
              "n": "80"
            },
            "files": {},
            "responses": {
              "click button#bend": "submit"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Recall Test2",
            "timeout": "12000",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "click button#bend": "submit"
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "Enter Words",
              "content": [
                {
                  "type": "lab.html.Form",
                  "content": "\u003Cstyle\u003E\n#div1{width: 900px;text-align:  center;}\n#div2{width: 900px; text-align: left;}\nheader{ padding: 5px; height: 100px;}\nfooter{ padding: 5px; height: 120px;}\nlabel {\n  width:200px;\n  display: inline-block;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cscript\u003E\n  $(document).keydown(function (e) {\n    var keycode1 = (e.keyCode ? e.keyCode : e.which);\n    if (keycode1 == 0 || keycode1 == 9) {\n        e.preventDefault();\n        e.stopPropagation();\n    }\n});\n\u003C\u002Fscript\u003E\n\n\u003Cheader\u003E\n  \u003Cp\u003E Which two words did you compare the size of this word to:\u003C\u002Fp\u003E\n  \u003Ch2\u003E \u003Cstrong\u003E${window.wordcue}\u003C\u002Fstrong\u003E\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cform\u003E\n    \u003Cdiv id = \"div1\"\u003E\n      \u003Cinput type = \"text\" name=\"recall\" id= \"recall\" required\n       onload=\"this.select();\" placeholder=\"Type in word\"\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id = \"div2\"\u003E\n      \u003Cp\u003E \n        ${window.stringy}\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n\n    \n  \u003C\u002Fform\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cp\u003E After 10 seconds the test will move on to the next word.\u003C\u002Fp\u003E\n\n\u003C\u002Ffooter\u003E",
                  "scrollTop": true,
                  "files": {},
                  "responses": {
                    "keypress(Enter) #recall": "enter",
                    "click button#bend": "submit"
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "end": function anonymous(
) {
window.word = document.getElementById("recall").value

window.stringy = stringy + word + ', '

this.data.typed_word = word
this.data.trial = free_index
this.data.test_cue = window.wordcue

if (this.data.response == "submit") {
  this.parent.end()
  this.parent.parent.end()
}

++window.free_index
},
                    "run": function anonymous(
) {
// Credits: http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
function setCaretPosition(ctrl, pos) {
  // Modern browsers
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  
  // IE8 and below
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

// Set the cursor position of the "#test-input" element to the end when the page loads
var input = document.getElementById('recall');
setCaretPosition(input, input.value.length);
},
                    "before:prepare": function anonymous(
) {
window.wordcue = window.wordcue_test2[CounterTest2];
}
                  },
                  "title": "Typing",
                  "tardy": true
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": ""
              },
              {
                "required": true,
                "type": "html",
                "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: center;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cheader\u003E\n\u003Cp\u003E\nPress \u003Ckbd\u003E space \u003C\u002Fkbd\u003E to see the next word.\n\u003C\u002Fp\u003E\n\u003C\u002Fheader\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "keypress(Space)": "start"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
window.free_index = 1000
window.stringy = ""
window.cue_word = window.wordcue_test2[CounterTest2];
CounterTest2++;
}
            },
            "title": "Ready"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "Thank you!",
          "content": "Thank you for participating in the experiment. Please answer these final questions truthfully - your responses will not affect your compensation."
        },
        {
          "required": true,
          "type": "radio",
          "options": [
            {
              "label": "Yes",
              "coding": "yes"
            },
            {
              "label": "No",
              "coding": "No"
            }
          ],
          "label": "Did you expect to be tested on all words regardless of color in the final test?",
          "name": "expect_test"
        },
        {
          "required": true,
          "type": "radio",
          "options": [
            {
              "label": "Yes, I used external aid",
              "coding": "Yes"
            },
            {
              "label": "No, I did not use external aid",
              "coding": "No"
            }
          ],
          "label": "Did you use any aid to remember the words (e.g., by writing them down on a piece of paper or in a computer file)?",
          "name": "use_help"
        },
        {
          "required": true,
          "type": "radio",
          "options": [
            {
              "label": "Yes, I tried to recall even words I was not told to remember",
              "coding": "Yes"
            },
            {
              "label": "No, I only tried to recall the words I was told to remember",
              "coding": "No"
            }
          ],
          "label": "In the final test, did you try to recall all words, regardless of their color?",
          "name": "in-the-final-test-did-you-try-to-recall-all-words-regardless-of-their-color"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Click here to confirm your participation to Prolific",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Thanks"
    }
  ]
})

// Let's go!
jatos.onLoad(() => study.run())