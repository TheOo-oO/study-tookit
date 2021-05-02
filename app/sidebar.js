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