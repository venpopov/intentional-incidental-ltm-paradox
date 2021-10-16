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
    "title": "int_inc_mem12",
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
      "content": "\u003Cheader\u003E\n  \u003Ch1\u003E Welcome to the study!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\n\u003Cstyle\u003E\n  #div1{width: 600px;text-align: center;}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv id=\"div1\"\u003E\n    \u003Cp\u003E Hello and welcome to our experiment.\u003C\u002Fp\u003E\n    \u003Cp\u003EMake sure you can work for 15 minutes without any interruption. Please avoid any distractions (i.e., TV, music, smartphones, kids, cats). \u003Cb\u003EPlease don't leave the study tab or switch windows on your computer while the experiment is ongoing. Doing so will disqualify you from continuing the experiment and you will not receive compensation on Prolific.\u003C\u002Fb\u003E Your cooperation will make sure we have high quality data for scientific inferences.\u003C\u002Fp\u003E\n \u003C!--  \u003Cp\u003E Please enter your personal subject number in the field. If you do not remember the number, restart the experiment. \u003C\u002Fp\u003E\n    \u003Cform\u003E\n      \u003Cinput name=\"subj\" id=\"subj\" required\u003E\n      \u003Cbutton for=\"subj\" type=\"submit\"\u003EContinue\u003C\u002Fbutton\u003E\n    \u003C\u002Fform\u003E --\u003E \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cbutton id =\"b\"\u003EContinue\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n\n\n\n\n",
      "scrollTop": true,
      "files": {},
      "responses": {
        "click button#b": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
/* General structure of the experiment can be found
in the scripts under Intro Screen!
*/

window.id = this.random.uuid4() 

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
"wrist"]

window.words = this.random.shuffle(window.uploadWords)

//assign words to lists
window.word1_list1 = window.words.slice (0, 32);
window.word1_list2 = window.words.slice (32, 64);

//shuffle words for source-memory task
window.word1_test1 = this.random.shuffle(window.word1_list1);
window.word1_test2 = this.random.shuffle(window.word1_list2);




//alert(subj_stim_type)

//# for each list, define which trials to remember and which to process
window.condition = ["remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process", "remember", "process","remember","process"];

// shuffle
window.condition_list1 = this.random.shuffle(window.condition);
window.condition_list2 = this.random.shuffle(window.condition);
window.condition_list3 = this.random.shuffle(window.condition);

// remove process words from first source test
//window.word1_test1 = [];
//for (var i=0;i<32;i++) {
//  if (window.condition_list1[i] == "remember") {
//    window.word1_test1.push(window.word1_list1[i]);
//  }
//}
//window.word1_test1 = this.random.shuffle(window.word1_test1);
//console.log(window.word1_test1);
//console.log(window.word1_list1)
//console.log(window.condition_list1)



// assign spatial position
var spatial_positions = [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4];
window.spatial_positions_list1 = [];
window.spatial_positions_list2 = [];

// spatial positions List 1
var spatial_positions_rem = this.random.shuffle(spatial_positions);
var spatial_positions_proc = this.random.shuffle(spatial_positions);
for (var i=0; i < 32; i++) {
  if (window.condition_list1[i] === "remember") {
    window.spatial_positions_list1.push(spatial_positions_rem[0]);
    spatial_positions_rem.splice(0,1);
  } else {
    window.spatial_positions_list1.push(spatial_positions_proc[0]);
    spatial_positions_proc.splice(0,1);    
  }
}

// spatial positions List 1
var spatial_positions_rem = this.random.shuffle(spatial_positions);
var spatial_positions_proc = this.random.shuffle(spatial_positions);
for (var i=0; i < 32; i++) {
  if (window.condition_list2[i] === "remember") {
    window.spatial_positions_list2.push(spatial_positions_rem[0]);
    spatial_positions_rem.splice(0,1);
  } else {
    window.spatial_positions_list2.push(spatial_positions_proc[0]);
    spatial_positions_proc.splice(0,1);    
  }
}

 //Define Counters for lists
 CounterList1 = 0
 CounterList2 = 0
 CounterTest1 = 0
 CounterTest2 = 0

//Define math problems
 window.math_problems = ["(2 + 3) x 4 = ?", "(4 - 3) x 8 = ?","(2 + 5) x 2 = ?","(5 + 3) / 4 = ?","(7 + 8) x 3 = ?","(8 + 8) / 4 = ?","(9 - 5) x 4 = ?","(9 - 3) x 3 = ?","(19 - 4) x 5 = ?","(12 - 3) / 3 = ?","(2 + 6) x 5 = ?","(1 + 7) x 6 = ?","(8 + 3) x 4 = ?","(21 + 12) / 11 = ?","(9 + 3) x 2 = ?","(4 + 3) x 4 = ?","(4 + 4) x 4 = ?","(3 + 9) x 2 = ?","(19 + 11) / 5 = ?","(17 + 23) / 8 = ?","(7 + 2) x 8 = ?","(3 + 6) / 3 = ?","(7 + 13) / 4 = ?","(13 + 23) x 2 = ?","(4 + 3) x 9 = ?","(2 + 2) x 16 = ?","(3 + 3) / 2 = ?","(6 + 6) / 3 = ?","(7 - 4) x 8 = ?","(21 - 9) / 4 = ?","(11 + 23) x 3 = ?","(45 - 23) / 11 = ?","(6 + 6) x 6 = ?","(2 + 2) / 2 = ?","(2 + 2) x 2 = ?","(3 + 3) x 8 = ?","(3 + 3) x 3 = ?","(4 + 2) x 9 = ?","(23 - 17) / 6 = ?","(50 - 23) / 9 = ?"];

window.math_problems = this.random.shuffle(window.math_problems);

window.math_problem_number = 0


// Kick out participants if they leave the experimental window twice
window.leave_counter = 0;
window.n_leaves = 3;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//group_id = window.subj % 4
group_id = getRandomInt(4)


//window.stim_type = ["words", "words"];
window.btw_cond = ["remember_all","remember_all","process_all","process_all"];
window.rem_color = ["red", "blue","red","blue"];
window.proc_color = ["blue", "red","blue","red"];

window.subj_stim_type = "words"
window.subj_btw_cond = window.btw_cond[group_id];
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
      "content": "\u003Cstyle\u003E\n#div1{width: 800px;text-align: left;}\nheader{  padding: 5px;  height: 120px;}\nfooter{  padding: 5px;  height: 100px;}\ndt{line-height: 2;font-weight: bold;}\ntable, th, td {  border: 1px solid black;\n  border-collapse: collapse;  background-color: #ecf2f9;}\nth, td {  padding: 1px;}\n\u003C\u002Fstyle\u003E\n\n\u003Cheader\u003E\n\u003Ch2\u003E Information on the study and consent form \u003C\u002Fh2\u003E\u003C\u002Fheader\u003E\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n\u003Cform id = \"consent\"\u003E\n\u003Cdiv id = \"div1\"\u003E\n \u003Cspan\u003E \u003Cb\u003EPlease read the information carefully.\u003C\u002Fb\u003E\u003C\u002Fspan\u003E\n\u003Cp\u003E\n \u003Cdl\u003E\u003Cdt\u003EAim of the study\u003C\u002Fdt\u003E\n \u003Cdd\u003EThis study examines the mental mechanisms involved in processing words. You will be asked to read English words and carry out several cognitive tasks with them. You will receive instructions about the tasks as you go along.\u003C\u002Fdd\u003E \n \u003C\u002Fp\u003E \n \u003Cp\u003E\n \u003Cdt\u003ERequirements\u003C\u002Fdt\u003E\n \u003Cdd\u003ETo participate in this study, you must be between 18-35 years old and you must be a native English speaker.\u003C\u002Fdd\u003E\n \u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EPossible advantages and benefits of participating in the study\u003C\u002Fdt\u003E\n \u003Cdd\u003E Participating in the present experiment will provide an important contribution to current cognition research and it offers an interesting insight into how cognition research is conducted.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EVoluntary participation\u003C\u002Fdt\u003E\n \u003Cdd\u003EYour participation in this study is voluntary. You have the right to waive your participation and you have the possibility to revoke your consent at any time and thus to terminate the study prematurely. The withdrawal from the study does not need to be justified.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EPossible disadvantages\u003C\u002Fdt\u003E\n \u003Cdd\u003EThere are none known.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\u003Cp\u003E\n \u003Cdt\u003EConfidentiality of data\u003C\u002Fdt\u003E\n \u003Cdd\u003EThe personal data collected in this study will be made anonymous by means of coding and will only be accessible to experts for scientific evaluation or members of the Ethics Committee of the Faculty of Philosophy of the University of Zurich for testing and control purposes in strict compliance with confidentiality. Subsequent publications of the data are based on mean values of the study results, making it impossible to draw conclusions about individuals.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\n\u003Cp\u003E\n\u003Cdt\u003E Duration of the study \u003C\u002Fdt\u003E\n \u003Cdd\u003EThe study takes 15 minutes in total.\u003C\u002Fdd\u003E\n\u003C\u002Fp\u003E\n\n  \u003Cp\u003E \u003Cb\u003EIf you agree with all the points listed, please check all the following boxes:\u003C\u002Fb\u003E\u003Cbr\u003E \u003C\u002Fp\u003E\n   \u003Cinput type=\"checkbox\" name=\"consent1\" id=\"consent1\" required\u003E\n    \u003Clabel for=\"consent1\"\u003EI confirm that I have read and understood all information on the study.\u003C\u002Flabel\u003E\u003Cbr\u003E \n    \u003Cinput type=\"checkbox\" name=\"consent2\" id=\"consent2\" required\u003E\n    \u003Clabel for=\"consent2\"\u003EI have taken note that participation in this experiment is voluntary and that I can cancel it at any time and without consequences.\u003C\u002Flabel\u003E\u003Cbr\u003E \n   \u003Cinput type=\"checkbox\" name=\"consent3\" id=\"consent3\" required\u003E\n    \u003Clabel for=\"consent3\"\u003EI confirm that I am at least 18 years old and want to participate in this study.\u003C\u002Flabel\u003E\u003Cbr\u003E \n   \n\u003C\u002Fdiv\u003E\n\u003C\u002Fform\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cbutton type=\"submit\" form = \"consent\" \u003E Continue\u003C\u002Fbutton\u003E\n\u003C\u002Ffooter\u003E\n",
      "scrollTop": true,
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Informed Consent"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "General instructions"
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\r\n#div1{width: 800px;text-align: left;}\r\nheader{  padding: 5px;  height: 120px;}\r\nfooter{  padding: 5px;  height: 100px;}\r\ndt{line-height: 2;font-weight: bold;}\r\ntable, th, td {  border: 1px solid black;\r\n  border-collapse: collapse;  background-color: #ecf2f9;}\r\nth, td {  padding: 1px;}\r\n\u003C\u002Fstyle\u003E\r\n\r\n\u003Cp\u003E In this experiment you will see a number of words that refer to concrete objects. Please judge for each object whether it is smaller or larger than a football. If the object is larger than a football, please press the \"UP\" arrow key on your keyboard. If the object is smaller than a football, please press the \"DOWN\" arrow key.\u003C\u002Fp\u003E\r\n\r\n\u003Cp\u003E Words will be shown in different locations on the screen. In addition to judging the size of the objects, please try to remember each word and its location for a later memory test. You will see two lists of words, and after each list you will have to write all the words that you can recall from the list. Then, your memory for the locations will be tested.\u003C\u002Fp\u003E\r\n\r\n",
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
      "title": "General instructions (remember)",
      "skip": "${ (window.subj_btw_cond != \"remember_all\")}"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "General instructions"
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\r\n#div1{width: 800px;text-align: left;}\r\nheader{  padding: 5px;  height: 120px;}\r\nfooter{  padding: 5px;  height: 100px;}\r\ndt{line-height: 2;font-weight: bold;}\r\ntable, th, td {  border: 1px solid black;\r\n  border-collapse: collapse;  background-color: #ecf2f9;}\r\nth, td {  padding: 1px;}\r\n\u003C\u002Fstyle\u003E\r\n\r\n\u003Cp\u003E In this experiment you will see a number of words that refer to concrete objects. Please judge for each object whether it is smaller or larger than a football. If the object is larger than a football, please press the \"UP\" arrow key on your keyboard. If the object is smaller than a football, please press the \"DOWN\" arrow key.\u003C\u002Fp\u003E\r\n\r\n\u003Cp\u003E You will see two lists of words, and after each list you will have to solve a series of simple equations before moving on to the next list.\u003C\u002Fp\u003E\r\n\r\n",
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
      "title": "General instructions (process)",
      "skip": "${ (window.subj_btw_cond != \"process_all\")}"
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
        "n": "32"
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
            "type": "lab.html.Screen",
            "files": {},
            "responses": {
              "keydown(ArrowUp)": "yes",
              "keydown(ArrowDown)": "no"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]
var spatial_position = window.spatial_positions_list1[CounterList1]

// get element to display word
var word1_L1 = document.getElementById(spatial_position); 
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
this.data.presented_position = spatial_position
this.data.btw_cond = subj_btw_cond

},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "words",
            "content": "\u003Cstyle\u003E\r\n.outer {\r\n  display: table;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.middle {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.inner {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 800px;\r\n  \u002F*whatever width you want*\u002F\r\n}\r\n\r\n  div.myTable {\r\n  border: 20px solid #AAAAAA;\r\n  background-color: #FFFFFF;\r\n  width: 600px;\r\n  height: 200px;\r\n  text-align: center;\r\n  margin: auto;\r\n}\r\n\r\n.divTable.myTable .divTableCell, .divTable.myTable .divTableHead {\r\n  width: 300px;\r\n  height: 100px;\r\n  padding: 35px 0px;\r\n}\r\n\r\n.divTable.myTable .divTableCell1 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell2 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell3 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell4 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n\r\n.divTable.myTable .divTableBody .divTableCell {\r\n  font-size: 25px;\r\n  font-weight: bold;\r\n}\r\n.myTable .tableFootStyle {\r\n  font-size: 14px;\r\n}\r\n.myTable .tableFootStyle .links {\r\n\t text-align: right;\r\n}\r\n.myTable .tableFootStyle .links a{\r\n  display: inline-block;\r\n  background: #1C6EA4;\r\n  color: #FFFFFF;\r\n  padding: 2px 8px;\r\n  border-radius: 5px;\r\n}\r\n.myTable.outerTableFooter {\r\n  border-top: none;\r\n}\r\n.myTable.outerTableFooter .tableFootStyle {\r\n  padding: 3px 5px; \r\n}\r\n\u002F* DivTable.com *\u002F\r\n.divTable{ display: table; }\r\n.divTableRow { display: table-row; }\r\n.divTableHeading { display: table-header-group;}\r\n.divTableCell, .divTableHead { display: table-cell;}\r\n.divTableHeading { display: table-header-group;}\r\n.divTableFoot { display: table-footer-group;}\r\n.divTableBody { display: table-row-group;}\r\n\u003C\u002Fstyle\u003E\r\n\u003Cmain\u003E\r\n\u003Cdiv class=\"outer\"\u003E\r\n\u003Cdiv class=\"middle\"\u003E\r\n\u003Cdiv id = \"rem\" class=\"inner\"\u003E \r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTable myTable inner\"\u003E\r\n\u003Cdiv class=\"divTableBody\"\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell1 divTableCell\" id=1\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell2 divTableCell\" id=2\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell3 divTableCell\" id=3\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell4 divTableCell\" id=4\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\r\n\u003Cdiv class=\"inner\"\u003E\r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003Cp\u003E Is this object larger than a football? \u003C\u002Fp\u003E\r\n\u003Cp\u003EFor \u003Cstrong\u003Eyes\u003C\u002Fstrong\u003E please press \u003Ckbd\u003E↑\u003C\u002Fkbd\u003E and for\u003C\u002Fp\u003E\r\n\u003Cp\u003E\u003Cstrong\u003Eno\u003C\u002Fstrong\u003E please press \u003Ckbd\u003E↓\u003C\u002Fkbd\u003E. \u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E\r\n",
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
            "timeout": "4000",
            "tardy": true,
            "skip": "${ (subj_stim_type == \"pairs\") || (window.fast \u003E '500')} "
          },
          {
            "type": "lab.html.Screen",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list1[CounterList1]
var spatial_position = window.spatial_positions_list1[CounterList1]

// get element to display word
var word1_L1 = document.getElementById(spatial_position); 
//word1_L1.textContent = myWord11
word1_L1.style.border = "20px solid " + window.trial_color


// style how to display
if (trial_condition == "xxx") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

// save data
this.data.trial_condition = condition_list1[CounterList1]
this.data.presented_word1 = myWord11
this.data.presented_color = trial_color
this.data.presented_position = spatial_position

},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "words_rem",
            "content": "\u003Cstyle\u003E\r\n.outer {\r\n  display: table;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.middle {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.inner {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 800px;\r\n  \u002F*whatever width you want*\u002F\r\n}\r\n\r\n  div.myTable {\r\n  border: 20px solid #AAAAAA;\r\n  background-color: #FFFFFF;\r\n  width: 600px;\r\n  height: 200px;\r\n  text-align: center;\r\n  margin: auto;\r\n}\r\n\r\n.divTable.myTable .divTableCell, .divTable.myTable .divTableHead {\r\n  width: 300px;\r\n  height: 100px;\r\n  padding: 35px 0px;\r\n}\r\n\r\n.divTable.myTable .divTableCell1 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell2 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell3 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell4 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n\r\n.divTable.myTable .divTableBody .divTableCell {\r\n  font-size: 25px;\r\n  font-weight: bold;\r\n}\r\n.myTable .tableFootStyle {\r\n  font-size: 14px;\r\n}\r\n.myTable .tableFootStyle .links {\r\n\t text-align: right;\r\n}\r\n.myTable .tableFootStyle .links a{\r\n  display: inline-block;\r\n  background: #1C6EA4;\r\n  color: #FFFFFF;\r\n  padding: 2px 8px;\r\n  border-radius: 5px;\r\n}\r\n.myTable.outerTableFooter {\r\n  border-top: none;\r\n}\r\n.myTable.outerTableFooter .tableFootStyle {\r\n  padding: 3px 5px; \r\n}\r\n\r\n#rem {\r\n  font-weight: bold;\r\n}\r\n\r\n\u002F* DivTable.com *\u002F\r\n.divTable{ display: table; }\r\n.divTableRow { display: table-row; }\r\n.divTableHeading { display: table-header-group;}\r\n.divTableCell, .divTableHead { display: table-cell;}\r\n.divTableHeading { display: table-header-group;}\r\n.divTableFoot { display: table-footer-group;}\r\n.divTableBody { display: table-row-group;}\r\n\u003C\u002Fstyle\u003E\r\n\u003Cmain\u003E\r\n\u003Cdiv class=\"outer\"\u003E\r\n\u003Cdiv class=\"middle\"\u003E\r\n\u003Cdiv id = \"rem\" class=\"inner\"\u003E \r\n\u003Cp\u003E Remember for the Test!\r\n\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTable myTable inner\"\u003E\r\n\u003Cdiv class=\"divTableBody\"\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell1 divTableCell\" id=1\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell2 divTableCell\" id=2\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell3 divTableCell\" id=3\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell4 divTableCell\" id=4\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\r\n\u003Cdiv class=\"inner\"\u003E\r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003Cp\u003E &nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E\r\n",
            "tardy": true,
            "skip": "${(window.fast \u003C= '500')}",
            "timeout": "3000"
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
          "content": "\u003Cp\u003EThis is the end of the practice list. Now, you have to solve a series of simple arithmetic problems. \nOn each slide you will see an unsolved equation like this one:\u003C\u002Fp\u003E\n\n\u003Cp\u003E(9 + 3) x 2 = __\u003C\u002Fp\u003E\n\n\u003Cp\u003EPlease solve the equation as accurately as possible and type your response in the input below it. In this example, the correct answer is 24. Press the ENTER button to submit your response and continue on to the next equation.\u003C\u002Fp\u003E\n\n\u003Cp\u003EPress any key to continue.\u003C\u002Fp\u003E"
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
      "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv id=\"div1\"\u003E\n    \u003Cp\u003E Next comes the memory test. First, you have to recall as many of the words you were told to remember as possible. \u003C\u002Fp\u003E\n    \u003Cp\u003E An \u003Cstrong\u003E input field\u003C\u002Fstrong\u003E will appear on the next screen. Please type in the words you were asked to remember from the previous list. After typing each word, press the \u003Ckbd\u003EEnter\u003C\u002Fkbd\u003E button and the word you typed will appear below the input field. This gives you an overview of which words you have already remembered.\u003C\u002Fp\u003E\n    \u003Cp\u003E You have 30 seconds time. Please use this time to remember as many of the words as possible. After the 30 seconds expire you will automatically continue to the next list.\u003C\u002Fp\u003E\n    \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\n\u003Cfooter\u003E \n  \u003Cp\u003EWhen you have read the instructions and are ready, press \u003Cbutton type=\"submit\" id = \"b5\" form = \"free_recall\" \u003E continue \u003C\u002Fbutton\u003Eto start the recall test.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E",
      "skip": "${ (window.subj_btw_cond == \"process_all\")}"
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
      "skip": "${ (window.subj_btw_cond == \"process_all\")}",
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
          "content": "\u003Cp\u003ENow we will test your memory for the locations. \u003C\u002Fp\u003E\n\n\u003Cp\u003EOn each screen you will see one of the words you were supposed to remember on the top. Below it you will see four squares with the numbers 1, 2, 3 and 4 in them.\u003C\u002Fp\u003E\n\n\u003Cp\u003ETry to remember in which square you saw the word before and press the corresponding key on your keyboard\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instructions Source Test 1",
      "skip": "${ (window.subj_btw_cond == \"process_all\")}"
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
        "n": "32"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Source test 1",
      "skip": "${ (window.subj_btw_cond == \"process_all\")}",
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
            "type": "lab.canvas.Screen",
            "content": [],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "Blank",
            "timeout": "1000"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "rect",
                "left": -75,
                "top": -14,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": 75,
                "top": -14,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": -75,
                "top": 86,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": 75,
                "top": 86,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "i-text",
                "left": -75,
                "top": -11,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "1",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 75,
                "top": -12,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "2",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": -75,
                "top": 85,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "3",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 75,
                "top": 88,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "4",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 0,
                "top": -111,
                "angle": 0,
                "width": 291.75,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${window.test_word}",
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
            "responses": {
              "keydown(1)": "1",
              "keydown(2)": "2",
              "keydown(3)": "3",
              "keydown(4)": "4"
            },
            "parameters": {},
            "messageHandlers": {
              "before:prepare": function anonymous(
) {
window.test_word = window.word1_test1[CounterTest1]
this.data.test_word = window.test_word
},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "Screen",
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
            "timeout": "4000",
            "tardy": true,
            "skip": "${(window.fast \u003E '500')} "
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
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
CounterTest1++
}
            },
            "title": "LastStepLoop",
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
          "content": ""
        },
        {
          "required": true,
          "type": "html",
          "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E The previous list was for practice. Now the real list begins. Please judge the size of the objects and remember each word and its location. You will no longer see instructions for each word, but your task is the same as in the practice list.\n\u003C\u002Fmain\u003E",
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
      "title": "Instructions list 2 (remember)",
      "skip": "${ (window.subj_btw_cond != \"remember_all\")}"
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
          "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cmain\u003E The previous list was for practice. Now the real list begins. Please judge the size of the objects. You will no longer see instructions for each word, but your task is the same as in the practice list.\n\u003C\u002Fmain\u003E",
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
      "title": "Instructions list 2 (process)",
      "skip": "${ (window.subj_btw_cond != \"process_all\")}"
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
        "mode": "draw",
        "n": "32"
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
            "type": "lab.html.Screen",
            "files": {},
            "responses": {
              "keydown(ArrowUp)": "yes",
              "keydown(ArrowDown)": "no"
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list2[CounterList2]
var spatial_position = window.spatial_positions_list2[CounterList2]

// get element to display word
var word1_L1 = document.getElementById(spatial_position); 
word1_L1.textContent = myWord11

// style how to display
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

// save data
this.data.trial_condition = condition_list2[CounterList2]
this.data.presented_word1 = myWord11
this.data.presented_color = trial_color
this.data.presented_position = spatial_position
this.data.btw_cond = subj_btw_cond

},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "words",
            "content": "\u003Cstyle\u003E\r\n.outer {\r\n  display: table;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.middle {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.inner {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 800px;\r\n  \u002F*whatever width you want*\u002F\r\n}\r\n\r\n  div.myTable {\r\n  border: 20px solid #AAAAAA;\r\n  background-color: #FFFFFF;\r\n  width: 600px;\r\n  height: 200px;\r\n  text-align: center;\r\n  margin: auto;\r\n}\r\n\r\n.divTable.myTable .divTableCell, .divTable.myTable .divTableHead {\r\n  width: 300px;\r\n  height: 100px;\r\n  padding: 35px 0px;\r\n}\r\n\r\n.divTable.myTable .divTableCell1 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell2 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell3 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell4 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n\r\n.divTable.myTable .divTableBody .divTableCell {\r\n  font-size: 25px;\r\n  font-weight: bold;\r\n}\r\n.myTable .tableFootStyle {\r\n  font-size: 14px;\r\n}\r\n.myTable .tableFootStyle .links {\r\n\t text-align: right;\r\n}\r\n.myTable .tableFootStyle .links a{\r\n  display: inline-block;\r\n  background: #1C6EA4;\r\n  color: #FFFFFF;\r\n  padding: 2px 8px;\r\n  border-radius: 5px;\r\n}\r\n.myTable.outerTableFooter {\r\n  border-top: none;\r\n}\r\n.myTable.outerTableFooter .tableFootStyle {\r\n  padding: 3px 5px; \r\n}\r\n\u002F* DivTable.com *\u002F\r\n.divTable{ display: table; }\r\n.divTableRow { display: table-row; }\r\n.divTableHeading { display: table-header-group;}\r\n.divTableCell, .divTableHead { display: table-cell;}\r\n.divTableHeading { display: table-header-group;}\r\n.divTableFoot { display: table-footer-group;}\r\n.divTableBody { display: table-row-group;}\r\n\u003C\u002Fstyle\u003E\r\n\u003Cmain\u003E\r\n\u003Cdiv class=\"outer\"\u003E\r\n\u003Cdiv class=\"middle\"\u003E\r\n\u003Cdiv id = \"rem\" class=\"inner\"\u003E \r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTable myTable inner\"\u003E\r\n\u003Cdiv class=\"divTableBody\"\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell1 divTableCell\" id=1\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell2 divTableCell\" id=2\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell3 divTableCell\" id=3\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell4 divTableCell\" id=4\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\r\n\u003Cdiv class=\"inner\"\u003E\r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003Cp\u003E &nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E\r\n",
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
            "timeout": "4000",
            "tardy": true,
            "skip": "${ (subj_stim_type == \"pairs\") || (window.fast \u003E '500')} "
          },
          {
            "type": "lab.html.Screen",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
// get word1
var myWord11 = window.word1_list2[CounterList2]
var spatial_position = window.spatial_positions_list2[CounterList2]

// get element to display word
var word1_L1 = document.getElementById(spatial_position); 
//word1_L1.textContent = myWord11
word1_L1.style.border = "20px solid " + window.trial_color


// style how to display
if (trial_condition == "remember") {
  document.getElementById("rem").style.display = "block"
} else {
  document.getElementById("rem").style.display = "none"
}

// save data
this.data.trial_condition = condition_list2[CounterList2]
this.data.presented_word1 = myWord11
this.data.presented_color = trial_color
this.data.presented_position = spatial_position

},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "words_rem",
            "content": "\u003Cstyle\u003E\r\n.outer {\r\n  display: table;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.middle {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.inner {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  width: 800px;\r\n  \u002F*whatever width you want*\u002F\r\n}\r\n\r\n  div.myTable {\r\n  border: 20px solid #AAAAAA;\r\n  background-color: #FFFFFF;\r\n  width: 600px;\r\n  height: 200px;\r\n  text-align: center;\r\n  margin: auto;\r\n}\r\n\r\n.divTable.myTable .divTableCell, .divTable.myTable .divTableHead {\r\n  width: 300px;\r\n  height: 100px;\r\n  padding: 35px 0px;\r\n}\r\n\r\n.divTable.myTable .divTableCell1 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell2 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell3 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n.divTable.myTable .divTableCell4 {\r\n  border: 20px solid #AAAAAA;\r\n}\r\n\r\n\r\n.divTable.myTable .divTableBody .divTableCell {\r\n  font-size: 25px;\r\n  font-weight: bold;\r\n}\r\n.myTable .tableFootStyle {\r\n  font-size: 14px;\r\n}\r\n.myTable .tableFootStyle .links {\r\n\t text-align: right;\r\n}\r\n.myTable .tableFootStyle .links a{\r\n  display: inline-block;\r\n  background: #1C6EA4;\r\n  color: #FFFFFF;\r\n  padding: 2px 8px;\r\n  border-radius: 5px;\r\n}\r\n.myTable.outerTableFooter {\r\n  border-top: none;\r\n}\r\n.myTable.outerTableFooter .tableFootStyle {\r\n  padding: 3px 5px; \r\n}\r\n\r\n#rem {\r\n  font-weight: bold;\r\n}\r\n\r\n\u002F* DivTable.com *\u002F\r\n.divTable{ display: table; }\r\n.divTableRow { display: table-row; }\r\n.divTableHeading { display: table-header-group;}\r\n.divTableCell, .divTableHead { display: table-cell;}\r\n.divTableHeading { display: table-header-group;}\r\n.divTableFoot { display: table-footer-group;}\r\n.divTableBody { display: table-row-group;}\r\n\u003C\u002Fstyle\u003E\r\n\u003Cmain\u003E\r\n\u003Cdiv class=\"outer\"\u003E\r\n\u003Cdiv class=\"middle\"\u003E\r\n\u003Cdiv id = \"rem\" class=\"inner\"\u003E \r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTable myTable inner\"\u003E\r\n\u003Cdiv class=\"divTableBody\"\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell1 divTableCell\" id=1\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell2 divTableCell\" id=2\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableRow\"\u003E\r\n\u003Cdiv class=\"divTableCell3 divTableCell\" id=3\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003Cdiv class=\"divTableCell4 divTableCell\" id=4\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\r\n\u003Cdiv class=\"inner\"\u003E\r\n\u003Cp\u003E &nbsp;\r\n\u003C\u002Fp\u003E\r\n\u003Cp\u003E &nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003Cp\u003E&nbsp;\u003C\u002Fp\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fdiv\u003E\r\n\u003C\u002Fmain\u003E\r\n",
            "tardy": true,
            "skip": "${(window.fast \u003C= '500')}",
            "timeout": "3000"
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
      "title": "Instruction Recall Test2 (process)",
      "content": "\u003Cstyle\u003E\n#div1{\nwidth: 900px;\ntext-align:  content-horizontal-center;\n}\n\u003C\u002Fstyle\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cdiv id=\"div1\"\u003E\n    \u003Cp\u003E Now we will test your memory for the words. Please write down all the words you can remember from the last list.\u003C\u002Fp\u003E\n    \u003Cp\u003E An \u003Cstrong\u003E input field\u003C\u002Fstrong\u003E will appear on the next screen. Please type in the words you can remember. After typing each word, press the \u003Ckbd\u003EEnter\u003C\u002Fkbd\u003E button and the word you typed will appear below the input field. \n    \u003C\u002Fp\u003E\n    \u003Cp\u003E You have 30 seconds time. Please use this time to remember as many of the words as possible. \u003C\u002Fp\u003E\n    \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\n\u003Cfooter\u003E \n  \u003Cp\u003EWhen you have read the instructions and are ready, press \u003Cbutton type=\"submit\" id = \"b5\" form = \"free_recall\" \u003E continue \u003C\u002Fbutton\u003Eto start the recall test.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E",
      "skip": "${ (window.subj_btw_cond != \"process_all\")}"
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
      "title": "Recall Test2",
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
            "content": "\u003Cstyle\u003E\n#div1{width: 900px;text-align:  center;}\n#div2{width: 900px; text-align: left;}\nheader{ padding: 5px; height: 100px;}\nfooter{ padding: 5px; height: 120px;}\nlabel {\n  width:200px;\n  display: inline-block;\n}\n\u003C\u002Fstyle\u003E\n\n\u003Cscript\u003E\n  $(document).keydown(function (e) {\n    var keycode1 = (e.keyCode ? e.keyCode : e.which);\n    if (keycode1 == 0 || keycode1 == 9) {\n        e.preventDefault();\n        e.stopPropagation();\n    }\n});\n\u003C\u002Fscript\u003E\n\n\u003Cheader\u003E\n  \u003Ch2\u003E Try to recall as many words as possible from the previous list:\u003C\u002Fh2\u003E\n\u003C\u002Fheader\u003E\n\n\n\u003Cmain class=\"content-horizontal-center\"\u003E\n  \u003Cform\u003E\n    \u003Cdiv id = \"div1\"\u003E\n      \u003Cinput type = \"text\" name=\"recall\" id= \"recall\" required\n       onload=\"this.select();\" placeholder=\"Type in word\"\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cdiv id = \"div2\"\u003E\n      \u003Cp\u003E \n        ${window.stringy}\n      \u003C\u002Fp\u003E\n    \u003C\u002Fdiv\u003E\n\n    \n  \u003C\u002Fform\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter\u003E\n  \u003Cp\u003E After 30 seconds it will continue automatically.\u003C\u002Fp\u003E\n\n\u003C\u002Ffooter\u003E",
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
          "content": "\u003Cp\u003ENow we will test your memory for the locations.\u003C\u002Fp\u003E\n\n\u003Cp\u003ETry to remember in which square you saw the word before and press the corresponding key on your keyboard.\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instructions Source Test 2 (remember)",
      "skip": "${ (window.subj_btw_cond != \"remember_all\")}"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": "\u003Cp\u003ENow we will test your memory for the locations. \u003C\u002Fp\u003E\n\n\u003Cp\u003EOn each screen you will see one of the words you were supposed to remember on the top. Below it you will see four squares with the numbers 1, 2, 3 and 4 in them.\u003C\u002Fp\u003E\n\n\u003Cp\u003ETry to remember in which square you saw the word before and press the corresponding key on your keyboard\u003C\u002Fp\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Instructions Source Test 2 (process)",
      "skip": "${ (window.subj_btw_cond != \"process_all\")}"
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
        "n": "32"
      },
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Source test 2",
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
            "type": "lab.canvas.Screen",
            "content": [],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {},
            "title": "Blank",
            "timeout": "1000"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "rect",
                "left": -75,
                "top": -14,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": 75,
                "top": -14,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": -75,
                "top": 86,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "rect",
                "left": 75,
                "top": 86,
                "angle": 0,
                "width": 150,
                "height": 100,
                "stroke": "#aaaaaa",
                "strokeWidth": 5,
                "fill": "#ffffff"
              },
              {
                "type": "i-text",
                "left": -75,
                "top": -11,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "1",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 75,
                "top": -12,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "2",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": -75,
                "top": 85,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "3",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 75,
                "top": 88,
                "angle": 0,
                "width": 17.8,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "4",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 0,
                "top": -111,
                "angle": 0,
                "width": 291.75,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${window.test_word}",
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
            "responses": {
              "keydown(1)": "1",
              "keydown(2)": "2",
              "keydown(3)": "3",
              "keydown(4)": "4"
            },
            "parameters": {},
            "messageHandlers": {
              "before:prepare": function anonymous(
) {
window.test_word = window.word1_test2[CounterTest2]
this.data.test_word = window.test_word
},
              "end": function anonymous(
) {
window.fast = this.data.duration
}
            },
            "title": "Screen",
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
            "timeout": "4000",
            "tardy": true,
            "skip": "${(window.fast \u003E '500')} "
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
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
CounterTest2++
}
            },
            "title": "LastStepLoop",
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
          "title": "Thank you!",
          "content": "Thank you for participating in the experiment. Please answer these final questions truthfully - your responses will not affect your compensation."
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
          "type": "textarea",
          "label": "Please describe with a few sentences what strategy you used to remember the words. Be as detailed as you can.",
          "name": "please-describe-with-a-few-sentences-what-strategy-you-used-to-remember-the-words.-be-as-detailed-as-you-can."
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Click here to confirm your participation to Prolific",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Thanks (rem)",
      "skip": "${(window.subj_btw_cond != \"remember_all\")}"
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
          "label": "Did you expect your memory to be tested at the end?",
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
          "label": "If you expected the memory test, did you use any aid to remember the words (e.g., by writing them down on a piece of paper or in a computer file)?",
          "name": "use_help"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Click here to confirm your participation to Prolific",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "Thanks (proc)",
      "skip": "${(window.subj_btw_cond != \"process_all\")}"
    }
  ]
})

// Let's go!
jatos.onLoad(() => study.run())