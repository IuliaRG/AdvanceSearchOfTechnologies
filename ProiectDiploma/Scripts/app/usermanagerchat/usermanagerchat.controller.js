var UserManagerChatController = (function () {
    function UserManagerChatController($scope) {
        this.initialize();
        this.scope = $scope;
        this.AdminDiscussion = [];
        this.UsersDiscussion = [];
    }
    UserManagerChatController.prototype.initialize = function () {
        var _this = this;
        var self = this;
        setTimeout(function () {
            //self.loadHub();
            //self.loadScript('jquery.js');
            self.loadScript('jquery.lightbox-0.5.js');
            self.loadScript('bootstrap.min.js');
            self.loadScript('bootshop.js');
            //self.loadChatScript('jquery-3.2.1.js');
            // self.loadChatScript('jquery.signalR-2.2.3.min.js');
            console.log(0);
            $(function () {
                self.chat = $.connection.chatHub;
                //  this.chat.client.receiveFromAdmin = (name, message, id) => this.ReceiveFromAdmin;
                self.chat.client.adminReceiveFromUser = function (id, message) {
                    self.AdminReceiveFromUser(id, message, self);
                };
                $('#message').focus();
                $.connection.hub.start().done(function () {
                    self.id = _this.chat.connection.id;
                    self.chat.server.registerAdmin(self.id);
                    //  this.chat.client.receiveFromAdmin = this.ReceiveFromAdmin;
                });
            });
        }, 1200);
    };
    UserManagerChatController.prototype.SendAdminMessage = function (chatModel) {
        //debugger
        //this.myHub = $;
        //this.chat = this.myHub.connection.chatHub;
        this.AdminDiscussion.push(chatModel.TextMessage);
        this.chat.server.sendToUser("Admin", chatModel.Id, chatModel.TextMessage);
        chatModel.TextMessage = "";
    };
    UserManagerChatController.prototype.AdminReceiveFromUser = function (from, message, self) {
        if (self.UsersDiscussion.map(function (it) { return it.Id; }).indexOf(from) > -1) {
            var chatVM = self.UsersDiscussion.filter(function (it) { return it.Id === from; })[0];
            chatVM.UserDiscussion.push('From' + ' ' + from + ':' + ' ' + message);
        }
        else {
            var ChatVM = new UserChatModel();
            ChatVM.Id = from;
            ChatVM.TextMessage = message;
            ChatVM.UserDiscussion.push('From' + ' ' + ChatVM.Id + ':' + ' ' + ChatVM.TextMessage);
            ChatVM.TextMessage = " ";
            self.UsersDiscussion.push(ChatVM);
        }
        self.scope.$apply();
    };
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
    UserManagerChatController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    UserManagerChatController.prototype.loadChatScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    };
    UserManagerChatController.prototype.loadHub = function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'signalr/hubs';
        head.appendChild(script);
    };
    return UserManagerChatController;
}());
var UserChatModel = (function () {
    function UserChatModel() {
        this.UserDiscussion = new Array();
    }
    return UserChatModel;
}());
//# sourceMappingURL=usermanagerchat.controller.js.map