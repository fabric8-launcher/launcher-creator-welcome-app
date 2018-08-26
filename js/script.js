$(document).ready(function () {
    initTooltips();
    initButtons();
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

function prependHcLivenessResponseToConsole(){
  var mockResponse = '{"checks":[{"id":"server-online","status":"UP"}],"outcome":"UP"}';
  prependObjectContents("#hcLivenessServerResponseConsole", formatResponseForConsole(mockResponse));
}

function clearHcLivenessConsole(){
  setObjectContexts("#hcLivenessServerResponseConsole","");
}

function prependHcReadinessResponseToConsole(){
  var mockResponse = 'OK';
  prependObjectContents("#hcReadinessServerResponseConsole", formatResponseForConsole(mockResponse));
}

function clearHcReadinessConsole(){
  setObjectContexts("#hcReadinessServerResponseConsole","");
}

function formatResponseForConsole(serverResponse){
  var currentTime = new Date($.now());
  var displayTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
  return displayTime + ": " + serverResponse + "\n";
}

function sendMessageToTopic1() {
  sendMessage("#messageTopic1Listener",'#messageTopic1Input');
}

function sendMessageToQueue1() {
  sendMessage("#messageQueue1Listener",'#messageQueue1Input');
}

function sendMessage(listener, inputControl) {
  var input = $(inputControl).val();
  prependObjectContents(listener, formatResponseForConsole(input));
  $(inputControl).val("");
}

function initButtons(){
  $('#hcLivenessExecuteButton').click(prependHcLivenessResponseToConsole);
  $('#hcLivenessClearButton').click(clearHcLivenessConsole);
  $('#hcReadinessExecuteButton').click(prependHcReadinessResponseToConsole);
  $('#hcReadinessClearButton').click(clearHcReadinessConsole);
  $('#messageTopic1ExecuteButton').click(sendMessageToTopic1);
  $('#messageQueue1ExecuteButton').click(sendMessageToQueue1);
}

