class UserManagerChatController {
    protected UsersDiscussion: Array<UserChatModel>;
    protected AdminDiscussion: Array<string>;
    protected myHub: any;
    protected chat: any;
    protected scope: any;
    protected id: any;
    protected Username: string;
    constructor($scope) {
        this.initialize();
        this.scope = $scope;
        this.AdminDiscussion = [];
        this.UsersDiscussion = [];
    }

    public initialize(): void {
        var self = this;
        setTimeout(() => {

            //self.loadHub();
            //self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            //self.loadChatScript('jquery-3.2.1.js');
            // self.loadChatScript('jquery.signalR-2.2.3.min.js');
            console.log(0);
            $(() => {
               
                self.chat = (<any>$).connection.chatHub;
                //  this.chat.client.receiveFromAdmin = (name, message, id) => this.ReceiveFromAdmin;
                self.chat.client.adminReceiveFromUser = (id, message) => {
                   
                    self.AdminReceiveFromUser(id, message, self);
                };
              
               $('#message').focus();
                (<any>$).connection.hub.start().done(() => {
                 
                    self.id = this.chat.connection.id;
                    self.chat.server.registerAdmin(self.id);

                    //  this.chat.client.receiveFromAdmin = this.ReceiveFromAdmin;
                });
            });

        }, 1200);

    }
    public SendAdminMessage(chatModel: UserChatModel) {
        //debugger
        //this.myHub = $;
        //this.chat = this.myHub.connection.chatHub;
        this.AdminDiscussion.push(chatModel.TextMessage);
        this.chat.server.sendToUser("Admin", chatModel.Id, chatModel.TextMessage);
        chatModel.TextMessage ="";
    }
   
    
    public AdminReceiveFromUser(from: string, message: string, self: UserManagerChatController) {
        debugger
     
       
        if (self.UsersDiscussion.map(it => it.Id).indexOf(from) > -1) {
            var chatVM = self.UsersDiscussion.filter(it => it.Id === from)[0];
            chatVM.UserDiscussion.push('From' + ' ' + from + ':' + ' ' + message)
        }
        else
        {
            var ChatVM = new UserChatModel();
            ChatVM.Id = from;
            ChatVM.TextMessage = message;
            ChatVM.UserDiscussion.push('From' + ' ' + ChatVM.Id + ':' + ' ' + ChatVM.TextMessage);
            ChatVM.TextMessage = " ";
            self.UsersDiscussion.push(ChatVM);
            
            
        }
            self.scope.$apply();

       
    }
    //chat.client.adminReceiveFromUser = function (name, message, id) {
    //    // Html encode display name and message.
    //    $("#discussion").append("<li>from " + name + ": " + message + "</li>");
    //    $("#sendmessage").attr('userName', name);
    //    $("#sendmessage").attr('userId', id);
    //    $("#sendmessage").click(function () {
    //        debugger
    //        var user = $(this).attr("userName");
    //        var userId = $(this).attr("userId");
    //        //send message to user
    //        var text = $("#message").val();
    //        $("#discussion").append("<li>me: " + text + "</li>");
    //        chat.server.sendToUser("Admin", user, text);
    //    });
    public loadScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    }
    public loadChatScript(path: string) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    }
    public loadHub() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'signalr/hubs';
        head.appendChild(script);
    }

}

class UserChatModel
{
    public Id: string;
    public TextMessage: string;
    public AdminMessage: string;
    public UserDiscussion: Array<string>;
    constructor() {
        this.UserDiscussion = new Array<string>();
    }
}