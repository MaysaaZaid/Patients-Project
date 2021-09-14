class templateEngineClass {

    init = () => {

    }

    renderTemplate = (templateString, data) => {
     debugger
        const item = templateString.match(/(?<={{).*?(?=}})/g);
        for (var i = 0; i < item.length; i++) {
            const value = data[item[i]];
            const bracketTemplateStringItems = "{{" + item[i] + "}}";
            templateString = templateString.replace(bracketTemplateStringItems, value)
        }
        return (templateString)
    }
}

var templateEngine = new templateEngineClass();