using Microsoft.AspNetCore.SignalR;

namespace SignalR_Progects.Hubs
{
    //--------------->     1
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public async Task NewWindowLoaded()
        {
            TotalViews++;
            //client
            await Clients.All.SendAsync("updateTotalViews",TotalViews);
        }
    }
}
