class routerEngineClass {
    init = () => {
        $(".action-link").click(
            this.onActionLinkClick
        )
    }
    navigate = (panel) => {
        this.hideAll();
        this.showPanel(panel);
    }
    onActionLinkClick = (e) => {
        const str = $(e.target).data("router-state");
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
const routerEngine = new routerEngineClass();
