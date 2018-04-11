var ChatController = (function () {
    function ChatController() {
        // this.initialize();
    }
    ChatController.prototype.initialize = function () {
        var self = this;
        setTimeout(function () {
            self.loadChatScript('jquery-3.2.1.js');
            self.loadChatScript('jquery.signalR-2.2.3.min.js');
            //self.loadHub();
            self.loadScript('bootstrap.min.js');
            //   self.loadScript('bootshop.js');
        }, 1000);
    };
    ChatController.prototype.loadScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../../Content/themes/js/' + path;
        head.appendChild(script);
    };
    ChatController.prototype.loadChatScript = function (path) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'Scripts/' + path;
        head.appendChild(script);
    };
    ChatController.prototype.loadHub = function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'signalr/hubs';
        head.appendChild(script);
    };
    return ChatController;
}());
//# sourceMappingURL=chat.controller.js.map