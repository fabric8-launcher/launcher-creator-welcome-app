let fruits = new Map();
let counter = 0;

$(document).ready(function () {
    $('#endpoint1GetButton').click(executeGetRequest);
    $('#endpoint1PostButton').click(executePostRequest);
    registerEnterOnFieldForFunction("#endpoint1PostInput", executePostRequest);

    $('#endpoint2DeleteButton').click(executeDeleteRequest);
    registerEnterOnFieldForFunction("#endpoint2DeleteInput", executeDeleteRequest);

    // Init some fruits
    fruits.set(0, "Cherry");
    fruits.set(1, "Apple");
    fruits.set(2, "Banana");
    counter = fruits.size;
  }
);

function executeGetRequest(){
    var serverResponse = formatResponseForConsole(JSON.stringify([...fruits]));
    prependObjectContents(endpoint1Console,serverResponse);
}

function executePostRequest(){
    var fruit = $("#endpoint1PostInput").val();
    // Precondition check
    if(fruit == ""){
        return;
    }
    fruits.set(counter++, fruit);
    var serverResponse = formatResponseForConsole('Created Fruit: "' + fruit + '"');
    prependObjectContents(endpoint1Console, serverResponse);
    $("#endpoint1PostInput").val("");
}

function executeDeleteRequest(){
    var idString = $("#endpoint2DeleteInput").val();
    $("#endpoint2DeleteInput").val("");
    if(idString == ""){
        return;
    }

    var id = parseInt(idString);
    var fruit = fruits.get(id);
    if(!fruit){
        return;
    }
    fruits.delete(id);
    var serverResponse = formatResponseForConsole('Removed Fruit: "' + fruit + '"');
    prependObjectContents(endpoint2Console, serverResponse);

}
