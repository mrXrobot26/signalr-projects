using Microsoft.AspNetCore.SignalR;

namespace SignalR_Progects.Hubs
{
    public class HouseGroupHub :Hub
    {

        public static List<string> GroupsJoind {  get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {

            if (!GroupsJoind.Contains(Context.ConnectionId+":"+houseName)) 
            {
                GroupsJoind.Add(Context.ConnectionId + ":" + houseName);
                //logic
                string HouseList = "";
                foreach (string House in GroupsJoind)
                {
                    if (House.Contains(Context.ConnectionId)) 
                    {
                        HouseList += House.Split(':')[1] + " ";                    
                    }

                }
                await Clients.Caller.SendAsync("subscriptionStatus",HouseList, houseName.ToLower(), true);
                await Clients.Others.SendAsync("newMemberAddedToHouse",houseName);
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);


            }


        }

        public async Task LeaveHouse(string houseName)
        {

            if (GroupsJoind.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoind.Remove(Context.ConnectionId + ":" + houseName);
                //logic
                string HouseList = "";
                foreach (string House in GroupsJoind)
                {
                    if (House.Contains(Context.ConnectionId))
                    {
                        HouseList += House.Split(':')[1] + " ";
                    }

                }
                await Clients.Caller.SendAsync("subscriptionStatus", HouseList, houseName.ToLower(), false);
                await Clients.Others.SendAsync("newMemberRemovedFromHouse", houseName);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);


            }


        }

        public async Task TriggerHouseNotify(string houseName)
        {
            await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
        }




    }
}
