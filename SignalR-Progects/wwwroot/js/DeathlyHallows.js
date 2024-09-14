var clockSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

var connectionDeathlyHallows = new signalR.HubConnectionBuilder().withUrl("/hubs/DeathlyHallows").build();

// Listen for updates from the server
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (clock, stone, wand) => {
    clockSpan.innerHTML = clock.toString();
    stoneSpan.innerHTML = stone.toString();
    wandSpan.innerHTML = wand.toString();
});


// Update the counts when the page first connects
function success() {
    connectionDeathlyHallows.invoke("GetRaceDictionary").then((raceCounter) => {
        clockSpan.innerHTML = raceCounter.cloak.toString();
        stoneSpan.innerHTML = raceCounter.stone.toString();
        wandSpan.innerHTML = raceCounter.wand.toString();
    }).catch(err => console.error("Error fetching race dictionary: " + err));

    console.log("Hub connected");
}

// Handle connection failure
function failed() {
    console.log("Hub failed to connect");
}

connectionDeathlyHallows.start().then(success).catch(failed);

