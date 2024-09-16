using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Tasks;

namespace SignalR_Projects.Hubs
{
    public class UserHub : Hub
    {
        private static int _totalViews = 0;
        private static int _totalUsers = 0;
        public static int TotalViews
        {
            get => Interlocked.CompareExchange(ref _totalViews, 0, 0);
            set => Interlocked.Exchange(ref _totalViews, value);
        }
        public static int TotalUsers
        {
            get => Interlocked.CompareExchange(ref _totalUsers, 0, 0);
            set => Interlocked.Exchange(ref _totalUsers, value);
        }

        public override async Task OnConnectedAsync()
        {
            Interlocked.Increment(ref _totalUsers);
            await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Interlocked.Decrement(ref _totalUsers);
            await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            await base.OnDisconnectedAsync(exception);
        }

        // i was using this with this SEND 

        //public async Task NewWindowLoaded()
        //{
        //    Interlocked.Increment(ref _totalViews);
        //    await Clients.All.SendAsync("updateTotalViews", TotalViews);
        //}


        // this with INVOKE
        //1- return type
        //2- get val from client

        public async Task<int> NewWindowLoaded(int valueFromClient)
        {

            // Use the value passed from the client (for demonstration)
            Console.WriteLine("New window opened : " + valueFromClient);

            Interlocked.Increment(ref _totalViews);
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
            //return a value to the client 
            return TotalViews;
        }
    }
}
