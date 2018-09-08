$(document).ready(function () {
    $('#hcLivenessExecuteButton').click(prependHcLivenessResponseToConsole);
    $('#hcLivenessClearButton').click(clearHcLivenessConsole);
    $('#hcReadinessExecuteButton').click(prependHcReadinessResponseToConsole);
    $('#hcReadinessClearButton').click(clearHcReadinessConsole);
  }
);

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
