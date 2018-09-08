let fruits = new Map();
let counter = 0;

$(document).ready(function () {
    $('#dbEndpoint1GetButton').click(executeGetRequest);
    $('#dbEndpoint1PostButton').click(executePostRequest);
    registerEnterOnFieldForFunction("#dbEndpoint1PostInput", executePostRequest);

    $('#dbEndpoint2DeleteButton').click(executeDeleteRequest);
    registerEnterOnFieldForFunction("#dbEndpoint2DeleteInput", executeDeleteRequest);

    $('#dbEndpoint2PutButton').click(executePutRequest);
    registerEnterOnFieldForFunction("#dbEndpoint2PutInput1", executePutRequest);
    registerEnterOnFieldForFunction("#dbEndpoint2PutInput2", executePutRequest);

    // Init some fruits
    fruits.set(0, "Cherry");
    fruits.set(1, "Apple");
    fruits.set(2, "Banana");
    counter = fruits.size;
  }
);

function executeGetRequest(){
    var serverResponse = formatResponseForConsole(JSON.stringify([...fruits]));
    prependObjectContents(dbEndpoint1Console,serverResponse);
}

function executePostRequest(){
    var fruit = $("#dbEndpoint1PostInput").val();
    // Precondition check
    if(fruit == ""){
        return;
    }
    fruits.set(counter++, fruit);
    var serverResponse = formatResponseForConsole('Created Fruit: "' + fruit + '"');
    prependObjectContents(dbEndpoint1Console, serverResponse);
    $("#dbEndpoint1PostInput").val("");
}

function executePutRequest(){
    var idString = $("#dbEndpoint2PutInput1").val();
    var newValue = $("#dbEndpoint2PutInput2").val();

    // Reset fields
    $("#dbEndpoint2PutInput1").val("");
    $("#dbEndpoint2PutInput2").val("");

    // No-op if no ID supplied
    if(idString == ""){
        return;
    }

    var id = parseInt(idString);
    var fruit = fruits.get(id);
    if(!fruit){
        var serverResponse = formatResponseForConsole('No fruit to update for ID: "' + id + '"');
        prependObjectContents(dbEndpoint2Console, serverResponse);
        return;
    }

    fruits.set(id, newValue);
    var serverResponse = formatResponseForConsole('Updated fruit "' + fruit + '"' + " to '" + newValue + "'");
    prependObjectContents(dbEndpoint2Console, serverResponse);
}

function executeDeleteRequest(){
    var idString = $("#dbEndpoint2DeleteInput").val();
    $("#dbEndpoint2DeleteInput").val("");
    if(idString == ""){
        return;
    }

    var id = parseInt(idString);
    var fruit = fruits.get(id);
    if(!fruit){
        var serverResponse = formatResponseForConsole('No fruit to delete for ID: "' + id + '"');
        prependObjectContents(dbEndpoint2Console, serverResponse);
        return;
    }
    fruits.delete(id);
    var serverResponse = formatResponseForConsole('Removed Fruit: "' + fruit + '"');
    prependObjectContents(dbEndpoint2Console, serverResponse);

}
