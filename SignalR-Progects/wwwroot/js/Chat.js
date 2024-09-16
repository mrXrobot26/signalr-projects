// DOM elements cached at the top for reuse
const sendMessageButton = document.getElementById("sendMessage");
const senderEmailInput = document.getElementById("senderEmail");
const chatMessageInput = document.getElementById("chatMessage");
const receiverEmailInput = document.getElementById("receiverEmail");
const messagesList = document.getElementById("messagesList");

// Initialize SignalR connection for the chat
const connectionChat = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/ChatHub").build();

// Disable the send button until the connection is established
sendMessageButton.disabled = true;

/**
 * Function to handle incoming chat messages and append them to the list
 * @param {String} user - The sender's email or name
 * @param {String} message - The content of the message
 */
function appendMessageToList(user, message) {
    const li = document.createElement("li");
    li.textContent = `${user} - ${message}`;
    messagesList.appendChild(li);
}

/**
 * Function to send a chat message to a specific receiver or to all users
 */
function sendMessage() {
    const sender = senderEmailInput.value.trim();
    const message = chatMessageInput.value.trim();
    const receiver = receiverEmailInput.value.trim();

    if (message.length === 0) {
        // Avoid sending empty messages
        return;
    }

    if (receiver.length > 0) {
        // Send message to a specific receiver
        connectionChat.send("SendMessageToReceiver", sender, receiver, message)
            .catch(function (err) {
                console.error(err.toString());
            });
    } else {
        // Broadcast message to all users
        connectionChat.send("SendMessageToAll", sender, message)
            .catch(function (err) {
                console.error(err.toString());
            });
    }

    // Clear the chat message input field after sending
    chatMessageInput.value = "";
}

/**
 * Function to initialize the SignalR connection and set up handlers
 */
function initializeConnection() {
    // Handle receiving messages from the server
    connectionChat.on("MessageReceived", appendMessageToList);

    // Start the connection
    connectionChat.start()
        .then(function () {
            // Enable the send button once the connection is established
            sendMessageButton.disabled = false;
        })
        .catch(function (err) {
            console.error("Connection failed: ", err.toString());
        });
}

// Set up the click event for sending messages
sendMessageButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form behavior
    sendMessage();
});

// Initialize the connection on page load
initializeConnection();





























//var connectionChat = new signalR.HubConnectionBuilder().withUrl("/hubs/ChatHub").build();
//document.getElementById("sendMessage").disabled = true;
//connectionChat.on("MessageReceived", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    li.textContent = `${user} - ${message}`;
//});
//document.getElementById("sendMessage").addEventListener("click", function (event) {
//    var sender = document.getElementById("senderEmail").value;
//    var message = document.getElementById("chatMessage").value;
//    var receiver = document.getElementById("receiverEmail").value;

//    if (receiver.length > 0) {
//        connectionChat.send("SendMessageToReceiver", sender, receiver, message);
//    }
//    else {
//        //send message to all of the users
//        connectionChat.send("SendMessageToAll", sender, message).catch(function (err) {
//            return console.error(err.toString());
//        });
//    }
//    event.preventDefault();
//})