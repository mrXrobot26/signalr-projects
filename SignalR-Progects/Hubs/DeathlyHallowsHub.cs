using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalR_Progects.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        // Return the current race dictionary when invoked
        public Task<Dictionary<string, int>> GetRaceDictionary()
        {
            return Task.FromResult(SD.DealthyHallowRace);
        }
    }
}
