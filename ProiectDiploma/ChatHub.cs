using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ProiectDiploma
{
    public class ChatHub : Hub
    {
        public static Dictionary<string, string> users;
        private static string adminId;
        public void SendToAll(string name, string message, string id)
        {
            Clients.All.addNewMessageToPage(name, message,id);
        }

        public void SendToAdmin(string name, string message, string id)
        {
            //Clients.All.addNewMessageToPage(name, message, id);
            // aici trebuie sa iei clientul admin din clients trebuie sa ne gandim cum
            //check if there is admin
            // Clients.Client(adminId).adminReceiveFromUser(name, message, id);
            Clients.Client(adminId).adminReceiveFromUser(name, message,id);
        }

        public void Register(string userName, string id)
        {
            if (users == null)
            {
                users = new Dictionary<string, string>();
            }

            if (users.ContainsKey(userName))
            {
                users[userName] = id;
            }
            else
            {
                users.Add(userName, id);
            }
        }

        public void RegisterAdmin(string userName, string id)
        {
            adminId = id;
        }

        public void SendToUser(string myUserName, string userName, string message)
        {
           
            var id = users[userName];
            Clients.Client(id).receiveFromAdmin(myUserName, message);
           // Clients.Client(id).addNewMessageToPage(myUserName, message);
        }

    }
}