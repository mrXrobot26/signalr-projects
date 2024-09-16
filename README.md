# SignalR Projects

This project demonstrates several features using **SignalR** for real-time communication. It includes chat functionality, house groups, notifications, a race, and a user count tracker.

## Features

1. **User Count Tracking**
   - Tracks the number of active users connected to the hub in real-time.
   
2. **Chat**
   - Real-time chat system with two modes:
     - **Send Message to All**: Broadcasts messages to all connected users.
     - **Send Message to Specific User**: Sends a private message to a specified user by email.
   - Integrated with SignalR for real-time message updates.

3. **Harry Potter Houses Grouping**
   - Allows users to join or leave specific house groups (e.g., Gryffindor, Slytherin).
   - Real-time updates for group membership.
   - SignalR broadcasts to specific groups (houses) when a user joins or leaves.

4. **Hallows Race**
   - A fun racing feature where users can pick different "Hallows" and compete in a real-time race.
   - Updates the status of the race and participants via SignalR.

5. **Notifications**
   - A real-time notification system that updates all users with new messages.
   - When a user sends a message, it appears in the dropdown notification list.
   - Notification counter updates with the number of new messages.

## Technology Stack

- **ASP.NET Core** (for the server-side)
- **SignalR** (for real-time communication)
- **JavaScript/HTML** (for the client-side)
- **Bootstrap** (for responsive styling)
- **Entity Framework Core** (for database operations)

## Setup Instructions

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/mrXrobot26/signalr-projects.git
    cd signalr-projects
    ```

2. **Install Dependencies:**

    Make sure you have the following installed:
    - [.NET SDK](https://dotnet.microsoft.com/download)
    - [SQL Server or SQLite] for database

3. **Configure Database:**

    In `appsettings.json`, set your database connection string for Entity Framework.

    Example:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=SignalR_Projects;Trusted_Connection=True;MultipleActiveResultSets=true"
    }
    ```

4. **Run Migrations:**

    Run the following command to create the database schema:
    ```bash
    dotnet ef database update
    ```

5. **Run the Application:**

    ```bash
    dotnet run
    ```


## Features Breakdown

### 1. User Count Tracking

The `UserCountHub` is responsible for tracking the number of users connected to the application in real-time. When a user connects or disconnects, the total count is updated and broadcasted to all users.

### 2. Chat

The `ChatHub` manages real-time communication between users. Users can either send messages to everyone or to a specific user. Authentication is required to send private messages.

### 3. Harry Potter Houses Grouping

The `HouseGroupHub` lets users join and leave specific Harry Potter house groups (e.g., Gryffindor, Slytherin). SignalR ensures that users receive real-time updates when members join or leave their house.

### 4. Hallows Race

The `HallowsRaceHub` allows users to participate in a race by selecting a hallow (an item from the Harry Potter universe). Users compete in real-time, and the race updates live with each participant's progress.

### 5. Notifications

The `NotificationHub` allows users to send notifications, which appear in a dropdown on the frontend. A counter updates with the number of unread notifications, and the list of messages is populated in real-time.

## Contributing

If you'd like to contribute to this project:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
