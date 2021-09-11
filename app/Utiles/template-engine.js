class templateEngineClass {

    init = () => {

    }

    renderTemplate = (templateString, data) => {
     
        var item = templateString.match(/(?<={{).*?(?=}})/g);
        for (var i = 0; i < item.length; i++) {
            var value = data[item[i]];
            var bracketTemplateStringItems = "{{" + item[i] + "}}";
            var templateString = templateString.replace(bracketTemplateStringItems, value);
        }
        return (templateString)
    }
}

var templateEngine = new templateEngineClass();