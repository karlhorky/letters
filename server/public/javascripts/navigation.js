var toolbar = document.getElementById('nav');
var buttons = document.getElementsByClassName('nav-item');

var state = {
  prevPosition: 0,
  currPosition: 0,
}

function trackMouse(event) {
  state.prevPosition = state.currPosition;
  state.currPosition = event.clientX;
}

function startTrackingMouse() {
  toolbar.addEventListener('mousemove', trackMouse, false);
  Array.from(buttons).forEach(button => button.addEventListener('mouseover', buttonEntered, false));
}

function stopTrackingMouse() {
  Array.from(buttons).forEach(button => button.removeEventListener('mouseover', buttonExited, false));
  toolbar.removeEventListener('mousemove', trackMouse, false);
}

var originalClassName = "nav-item";

function buttonEntered() {
  var direction = state.prevPosition < state.currPosition ? "right" : "left";
  console.log("Previous Position: " + state.prevPosition);
  console.log("Current Position: " + state.currPosition);
  this.className = `${originalClassName} hover-${direction}`;
}

function buttonExited() {
  var direction = state.prevPosition < state.currPosition ? "out-right" : "out-left";
  this.className = `${originalClassName} hover-${direction}`;
}

toolbar.addEventListener('mouseover', startTrackingMouse, false);
toolbar.addEventListener('mouseout', stopTrackingMouse, false);
Array.from(buttons).forEach(button =>   button.addEventListener('mouseout', buttonExited, false));