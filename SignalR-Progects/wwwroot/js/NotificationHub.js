// DOM elements fetched once at the top
const sendButton = document.getElementById("sendButton");
const notificationInput = document.getElementById("notificationInput");
const messageList = document.getElementById("messageList");
const notificationCounter = document.getElementById("notificationCounter");

// Initialize SignalR connection
const connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/NotificationHub").build();

// Disable the send button initially until connection is established
sendButton.disabled = true;

/**
 * Function to handle the notifications received from the server
 * @param {Array} messages - List of messages received from the server
 * @param {Number} counter - The total count of notifications
 */
function updateNotificationList(messages, counter) {
    // Clear the existing message list
    messageList.innerHTML = "";

    // Update the notification counter
    notificationCounter.innerHTML = `<span>(${counter})</span>`;

    // Add each message to the message list in reverse order (latest first)
    for (let i = messages.length - 1; i >= 0; i--) {
        const li = document.createElement("li");
        li.textContent = `Notification - ${messages[i]}`;
        messageList.appendChild(li);
    }
}

/**
 * Function to send the message to the server
 */
function sendMessage() {
    const message = notificationInput.value.trim();

    if (message) {
        connectionNotification.send("SendMessage", message).then(() => {
            // Clear the input field after message is sent
            notificationInput.value = "";
        });
    }
}

/**
 * Function to initialize the SignalR connection
 */
function initializeConnection() {
    // Handle incoming notifications from the server
    connectionNotification.on("LoadNotification", updateNotificationList);

    // Start the connection and handle success or failure
    connectionNotification.start().then(() => {
        // Request to load existing messages
        connectionNotification.send("LoadMessages");

        // Enable the send button once connected
        sendButton.disabled = false;
    }).catch(error => {
        console.error("Connection failed: ", error);
    });
}

/**
 * Event listener for the Send button click
 */
sendButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default button action (e.g., form submission)
    sendMessage();
});

// Initialize the connection on page load
initializeConnection();













/////////////////////////////////////////old code

//var connectionNotification = new signalR.HubConnectionBuilder()
//    .withUrl("/hubs/NotificationHub").build();

//document.getElementById("sendButton").disabled = true;

//connectionNotification.on("LoadNotification", function (message, counter) {
//    document.getElementById("messageList").innerHTML = "";
//    var notificationCounter = document.getElementById("notificationCounter");
//    notificationCounter.innerHTML = "<span>(" + counter + ")</span>";
//    for (let i = message.length - 1; i >= 0; i--) {
//        var li = document.createElement("li");
//        li.textContent = "Notification - " + message[i];
//        document.getElementById("messageList").appendChild(li);
//    }
//});

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var message = document.getElementById("notificationInput").value;
//    connectionNotification.send("SendMessage", message).then(function () {
//        document.getElementById("notificationInput").value = "";
//    });
//    event.preventDefault();
//});


//connectionNotification.start().then(function () {
//    connectionNotification.send("LoadMessages")
//    document.getElementById("sendButton").disabled = false;
//});