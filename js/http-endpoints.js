$(document).ready(function () {
    $('#httpEndpoint1GetButton').click(executeHttpEndpointGetRequest);
    registerEnterOnFieldForFunction("#httpEndpoint1GetInput", executeHttpEndpointGetRequest);
  }
);

function executeHttpEndpointGetRequest(){

    var input = $('#httpEndpoint1GetInput').val();
    $('#httpEndpoint1GetInput').val("");
    if(input == ""){
        input = "World";
    }
    var message = "Hello, " + input + "!";

    var serverResponse = formatResponseForConsole(message);
    prependObjectContents(httpEndpoint1Console,serverResponse);
}
