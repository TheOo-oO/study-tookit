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

export default Clock;