$(document).ready(function () {
    initTooltips();
  }
);

function initTooltips(){
  $('[data-toggle="tooltip"]').tooltip();
}

function setObjectContexts(id, newValue){
  $(id).text(newValue);
}

function prependObjectContents(id, prependValue){
  var current = $(id).text();
  setObjectContexts(id, prependValue + current);
}

function formatResponseForConsole(serverResponse){
  var currentTime = new Date($.now());
  var displayTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
  return displayTime + ": " + serverResponse + "\n";
}

function registerEnterOnFieldForFunction(fieldName, func){
  $(fieldName).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // Enter
    if(keycode == '13'){
      func();
    }
  });
}
