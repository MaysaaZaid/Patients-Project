class routerEngineClass {
    init = () => {
        this.initNavigation();
    }
    navigate = (panel) => {
        this.hideAll();
        this.showPanel(panel);
    }
    initNavigation = () => {
        $(".navigation-link").click(
            this.showPage
        )
    };
    showPage = (e) => {
        var str = $(e.target).data("router-state");
        this.hideAll();
        this.showPanel(str);
    }
    hideAll = () => {
        $(".panel").hide();
    }
    showPanel = (str) => {
        $("." + str).show();
    }
}
var routerEngine = new routerEngineClass();
