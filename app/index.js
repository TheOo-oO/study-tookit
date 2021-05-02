const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');
//event listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)
//functions

function addTodo(event) {
    event.preventDefault();
    //todo DIVmac
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //todo LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ""){
        return null
    }
    //check mark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);
    //delete BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);
    //Append to Actual LIST
    todoList.appendChild(todoDiv);
    //Clear todo input VALUE
    todoInput.value = ""
}

//DELETE & CHECK
function deleteCheck(e) {
    const item = e.target;
    //DELETE ITEM
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        //ANIMATION TRANSITION
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    //COMPLETE ITEM
    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
    }
}
//FILTERING THE TASKS ACCORDING THE OPTION
function filterTodo(e) {
    const todos = todoList.childNodes;
    for(let i = 1; i<todos.length; i++ ){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }
} 


//Tabs
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
// Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();


// Timer 
const counter = document.querySelector('.counter');
const btn = document.querySelector('.buttons');
const secondsInput = document.getElementById('seconds');

// New stuff above
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let TIME_LIMIT = 1000;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
    
  </svg>
  <span id="base-timer-label" class="base-timer__label" contenteditable="false" >${formatTime(
    timeLeft
  )}</span>
  <input class="minInput" min="0" type="number" placeholder="MM" 
  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="2"></input>
  <input class="secInput" min="0" type="number" placeholder="SS" 
  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="2"></input>
  <span><button id="timer-button" class="timer-button" >Start</button></span>
</div>
`;

// minInput.addEventListener("click")
// secInput.addEventListener("click")
const minInput = document.querySelector(".minInput")
const secInput = document.querySelector(".secInput")


// let timeInput = document.getElementById("base-timer-label");

// timeInput.addEventListener("input", function({
  
// })

let timerbutton = document.getElementById("timer-button");

// startTimer();
function pauseTimer() {
  clearInterval(timerInterval);
}


timerbutton.addEventListener("click", function(){
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        pauseTimer();
      }
    }, 1000);
  }
  if (timerbutton.innerText === "Pause"){
    timerbutton.innerText = "Resume";
    pauseTimer();
  } else {
    timerbutton.innerText = "Pause";
    startTimer();
  }
})


// function startTimer() {
//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1;
//     timeLeft = TIME_LIMIT - timePassed;
//     document.getElementById("base-timer-label").innerHTML = formatTime(
//       timeLeft
//     );
//     setCircleDasharray();
//     setRemainingPathColor(timeLeft);

//     if (timeLeft === 0) {
//       onTimesUp();
//     }
//   }, 1000);
// }

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}



// Assessment due date 
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//Input Date 
const dateControl = document.querySelector('.assessment_date');
assessment_date = dateControl.valueAsNumber;
dateControl.value = ""
// dateControl.value = '2021-05-01';
// newSubject.innerText = subjectInput.value  

//Change colour of clock 
const colorInput = document.querySelector('.colorpick')
const colourBox = document.querySelector('.colourbox')

function colours(){
  colorInput.value = colourBox.value;
}
document.getElementById("colours_list").onchange = colours;

const subjectInput = document.querySelector('.subject_box')
const descriptionInput = document.querySelector('.description_box')
const assessmentDate = document.querySelector('.assessment_date')
const assessmentList = document.querySelector('.assessment_list')
assessmentList.addEventListener("click", deleteAssessment);

const addDue = document.querySelector('.add_button')
addDue.addEventListener("click", addAssessment)
function addAssessment(event){
  event.preventDefault(); 
  // Assessment Div 

  const deleteClock = document.createElement('button')
  deleteClock.innerText = "-"
  deleteClock.classList.add('delete_clock')
  // deleteClock.setAttribute("id", "deleteclock"); 

  const assessmentDiv = document.createElement('div')
  assessmentDiv.classList.add('clock')
  assessmentDiv.setAttribute("style", `background-color: ${colorInput.value};`); 
  const dateControl = document.querySelector('.assessment_date');
  assessment_date = dateControl.valueAsNumber;

  //Show date 
  const newDate = document.createElement('div')
  newDate.classList.add('newdate') 
  newDate.innerText = new Intl.DateTimeFormat('en-AU', { dateStyle: 'full' }).format(assessment_date)

  //Subject bit
  const newSubject = document.createElement('div')
  newSubject.innerText = subjectInput.value;
  newSubject.classList.add('subjects')

  // Description bit 
  const newDescription = document.createElement('div')
  newDescription.classList.add('description')
  newDescription.innerText = descriptionInput.value;

  if(subjectInput.value === ""){
    return null
  }
  function initializeClock(id, endtime) {
    // const clock = document.getElementsByClassName(id);
    // const daysSpan = clock.querySelector('.days');
    // const hoursSpan = clock.querySelector('.hours');
    // const minutesSpan = clock.querySelector('.minutes');
    

    const dateDiv = document.createElement('div')
    dateDiv.classList.add('datebox')

    const dayslotDiv = document.createElement('div');
    dayslotDiv.classList.add('cboxday')
    const hourslotDiv = document.createElement('div');
    hourslotDiv.classList.add('cboxhour')
    const minuteslotDiv = document.createElement('div');
    minuteslotDiv.classList.add('cboxmin')

    const dsmallText = document.createElement('div')
    dsmallText.classList.add('smalltextDay')
    dsmallText.innerHTML = "Days"
    const hsmallText = document.createElement('div')
    hsmallText.classList.add('smalltext')
    hsmallText.innerHTML = "Hours"
    const msmallText = document.createElement('div')
    msmallText.classList.add('smalltext')
    msmallText.innerHTML = "Minutes"


    const dayDiv = document.createElement('span');
    dayDiv.classList.add('days');
    const hourDiv = document.createElement('span');
    hourDiv.classList.add('hours');
    const minuteDiv = document.createElement('span');
    minuteDiv.classList.add('minutes');

    function updateClock() {
      const t = getTimeRemaining(endtime);
      // daysSpan.innerHTML = t.days;
      // hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      // minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      dayDiv.innerHTML = t.days;
      hourDiv.innerHTML = ('0' + t.hours).slice(-2);
      minuteDiv.innerHTML = ('0' + t.minutes).slice(-2);

  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
    dayslotDiv.appendChild(dayDiv);
    hourslotDiv.appendChild(hourDiv);
    minuteslotDiv.appendChild(minuteDiv);

    dayslotDiv.appendChild(dsmallText);
    hourslotDiv.appendChild(hsmallText);
    minuteslotDiv.appendChild(msmallText);
    
    dateDiv.appendChild(dayslotDiv)
    dayslotDiv.appendChild(hourslotDiv)
    dayslotDiv.appendChild(minuteslotDiv)
    // dateDiv.appendChild(hourslotDiv)
    // dateDiv.appendChild(minuteslotDiv)
    // assessmentDiv.appendChild(deleteDiv);
    assessmentDiv.appendChild(deleteClock);
    assessmentDiv.appendChild(newSubject);
    assessmentDiv.appendChild(newDescription);
    assessmentDiv.appendChild(newDate);
    assessmentDiv.appendChild(dateDiv);
    
  }
  const deadline = new Date(assessment_date);
  initializeClock('.clock', deadline);
  // Add to actual list 
  assessmentList.appendChild(assessmentDiv);
  subjectInput.value = ""
  descriptionInput.value = ""
  dateControl.value = ""

  // Return to display:none for clock 
  let editDelete = document.querySelectorAll("button.delete_clock")
  let clockwiggle = document.querySelectorAll("div.clock")
  let editBtn = document.getElementById("edit")
  for (i = 0; i < editDelete.length; i++) {
    editDelete[i].style.display = 'none';
    clockwiggle[i].style.animation = "";
    clockwiggle[i].style.animationIterationCount = "";
    clockwiggle[i].style.opacity = "0.9";
    editBtn.innerText = "Edit"
  }
  
  closeForm()
}

function showDelete(){
  let editDelete = document.querySelectorAll("button.delete_clock")
  let clockwiggle = document.querySelectorAll("div.clock")
  let editBtn = document.getElementById("edit")
  for (i = 0; i < editDelete.length; i++)
  if (editDelete[i].style.display === "block") {
    editDelete[i].style.display = 'none';
    clockwiggle[i].style.animation = "";
    clockwiggle[i].style.animationIterationCount = "";
    clockwiggle[i].style.opacity = "0.9";
    
  } else {
    editDelete[i].style.display = 'block';
    clockwiggle[i].style.animation = "shake 1s cubic-bezier(.36,.07,.19,.97) both";
    clockwiggle[i].style.animationIterationCount = "infinite";
    clockwiggle[i].style.opacity = "0.7";
  }
  if (editBtn.innerText === "Edit") {
    editBtn.innerText = "Cancel"
  } else {
    editBtn.innerText = "Edit"
  }
}

//Delete
function deleteAssessment(e){
  const item = e.target;
  if (item.classList[0] === "delete_clock"){
    const clock = item.parentElement;
      clock.remove()
  }
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    // const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      // seconds
    };
  }

  
// function initializeClock(id, endtime) {
//   const clock = document.getElementById(id);
//   const daysSpan = clock.querySelector('.days');
//   const hoursSpan = clock.querySelector('.hours');
//   const minutesSpan = clock.querySelector('.minutes');
//   // const secondsSpan = clock.querySelector('.seconds');

//   function updateClock() {
//     const t = getTimeRemaining(endtime);

//     daysSpan.innerHTML = t.days;
//     hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//     minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//     // secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }

//   updateClock();
//   const timeinterval = setInterval(updateClock, 1000);
// }

// const deadline = new Date(Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000);
// const deadline = new Date(assessment_date);
// initializeClock('clockdiv', deadline);


// Sidebar
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const switcher_btn = document.getElementById("switcher-button-icon")
document.querySelector('.drag-button').onclick = function () {
  sidebar.classList.toggle('sidebar_small');
  mainContent.classList.toggle('main-content_large')
  let tabcontent = document.getElementById("due-content");
  if (tabcontent.style.display === 'none'){
    tabcontent.style.display = 'block';
    switcher_btn.style.transform = "rotate(180deg)"
  } else {
    tabcontent.style.display = 'none';
    switcher_btn.style.transform = "rotate(360deg)"
  }
}




// function openSidebar() {
//   // Declare all variables
//   var i, tabcontent, tablinks;

//   // Get all elements with class="tabcontent" and hide them
//   // tabcontent = document.getElementsByClassName("clock");
//   // for (i = 0; i < tabcontent.length; i++) {
//   //   tabcontent[i].style.display = "none";
//   // }
//   tabcontent = document.getElementById('test-button');
//   if (tabcontent.style.display === 'none'){
//     tabcontent.style.display = 'block';
//   } else {
//     tabcontent.style.display = 'none';
//   }

  // // Get all elements with class="tablinks" and remove the class "active"
  // tablinks = document.getElementsByClassName("drag-button");
  // for (i = 0; i < tablinks.length; i++) {
  //   tablinks[i].className = tablinks[i].className.replace(" active", "");
  // }

  // // Show the current tab, and add an "active" class to the button that opened the tab
  // document.getElementById(cityName).style.display = "block";
  // evt.currentTarget.className += " active";
// }



//Note Taking Javasscript
class Note {

  constructor({title, body}, noteManager) {
    this.el = null;
    this.title = title;
    this.body = body;
    this.noteManager = noteManager;
  }

  static getNoteTpl() {
    return `
        <div class="tc-note">
            <div class="tc-note-header">
                <span class="tc-note-close">
                    <i class="fas fa-times"></i>
                </span>
            </div>
            <div class="tc-note-title" contenteditable="" placeholder="Type something...">
                {{title}}
            </div>
            <div class="tc-note-body" contenteditable="">
                {{body}}
            </div>
        </div>`;
  }

  createNoteEl() {
    let tpl = Note.getNoteTpl();
    tpl = tpl
      .replace('{{title}}', this.title)
      .replace('{{body}}', this.body)
    ;
    const div = document.createElement('div');
    div.innerHTML = tpl;
    this.el = div.children[0];
    this.attachEventListeners();
    return this.el;
  }

  attachEventListeners(){
    const btnClose = this.el.querySelector('.tc-note-close');
    btnClose.onclick = () => {
      this.noteManager.removeNote(this);
    };
    const title = this.el.querySelector('.tc-note-title');
    title.oninput = (ev) => {
      this.title = ev.target.innerText;
      this.noteManager.onNoteChange(this);
    };
    const body = this.el.querySelector('.tc-note-body');
    body.oninput = (ev) => {
      this.body = ev.target.innerText;
      this.noteManager.onNoteChange(this);
    }
  }
}

class NoteManager {
  constructor({el, notes}) {
    this.el = el;
    this.el.className = 'tc-notes-wrapper';
    this.notesEl = null;
    this.notes = notes.map(note => new Note(note, this));

    this.onNoteChange = () => {
    };
    this.createNewNoteButton();
    this.createNotesWrapper();
    this.renderNotes();
  }

  addNote(note) {
    this.notes.push(new Note(note, this));
    this.renderNotes();
  }

  prependNote(note) {
    this.notes.unshift(new Note(note, this));
    this.renderNotes();
  }

  removeNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
    this.renderNotes();
  }

  createNewNoteButton(){

  }

  createNotesWrapper() {
    this.notesEl = document.createElement('div');
    this.notesEl.className = 'tc-notes';
    this.el.appendChild(this.notesEl);
  }

  renderNotes() {
    this.notesEl.innerHTML = '';
    this.notes.forEach(note => this.renderNote(note));
  }

  renderNote(note) {
    this.notesEl.appendChild(note.createNoteEl())
  }
}

const noteManager = new NoteManager({
  el: document.getElementById('notesWrapper'),
  notes: [
    {
      title: 'Subject',
      body: 'uia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      title: 'qui est esse',
      body: 'est rerum tempore vitae<br>nsequi sint nihil reprehenderit dolor beatae ea dolores neque <br>fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis<br>qui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est'
    },
    {
      title: 'This is a demo note',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi corrupti officiis alias tenetur, tenetur iste maxime laudantium?'
    },
  ]
});

noteManager.onNoteAdd = (note) => {
  console.log("Note added ", note);
};
noteManager.onNoteChange = (note) => {
  console.log("Note changed ", note);
};
noteManager.onNoteRemove = (note) => {
  console.log("Note removed ", note);
};

const newNoteBtn = document.querySelector('.new-note-btn');
newNoteBtn.onclick = () => {
  noteManager.prependNote({
    title: '',
    body: ''
  })
};