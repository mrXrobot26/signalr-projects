
// Create connection
//basic form
/*var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();*/

var connectionUserCount = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)// instade Information there is (None, Critical, Error, Warning, Information, Debug, or Trace)
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
    .build();

// Connect method to hub (receive notification from hub)
connectionUserCount.on("updateTotalViews", (value) => {
    var id = document.getElementById("totalViewsCounter");
    if (id) {
        id.innerHTML = value.toString();
    } else {
        console.error("Element with id 'totalViewsCounter' not found.");
    }
});



connectionUserCount.on("updateTotalUsers", (value) => {
    var id = document.getElementById("totalUserCounter");
    if (id) {
        id.innerHTML = value.toString();
    } else {
        console.error("Element with id 'totalUserCounter' not found.");
    }
});

// Invoke hub method (Send to notification hub)

// 1- SEND

//function NewWindowLoadedOnClient() {
//    connectionUserCount.send("NewWindowLoaded")
//        .catch(err => console.error(err.toString()));


//}


// 2- INVOK
// diffrent btw sennd and invoke is that invok can
//1 - passing a value to the server
//2 - and receiving a result from the server 

function NewWindowLoadedOnClient() {
    const someValue = 42;
    connectionUserCount.invoke("NewWindowLoaded", someValue /*to sever*/)
                       .then(result => {
                           console.log("Server returned:", result /*from server*/);
                       })
                       .catch(err => console.error("Error invoking hub method:", err.toString()));
}

// Start connection
function success() {
    console.log("Hub connected");
    NewWindowLoadedOnClient();
}

function failed() {
    console.log("Hub failed to connect");
}

connectionUserCount.start().then(success).catch(failed);
