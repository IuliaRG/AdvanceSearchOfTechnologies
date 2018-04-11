var UserManagerChatController = (function () {
    function UserManagerChatController() {
        this.initialize();
    }
    UserManagerChatController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadChatScript('jquery-3.2.1.js');
            self.loadChatScript('jquery.signalR-2.2.3.min.js');
            self.loadHub();
            self.loadScript('bootstrap.min.js');
            // self.loadScript('bootshop.js');
        }, 1000);
    };
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
//# sourceMappingURL=usermanagerchat.controller.js.map