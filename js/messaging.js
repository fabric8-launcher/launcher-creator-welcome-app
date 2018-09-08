$(document).ready(function () {
    $('#messageTopic1ExecuteButton').click(sendMessageToTopic1);
    registerEnterOnFieldForFunction("#messageTopic1Input", sendMessageToTopic1);
    $('#messageQueue1ExecuteButton').click(sendMessageToQueue1);
    registerEnterOnFieldForFunction("#messageQueue1Input", sendMessageToQueue1);
  }
);

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
