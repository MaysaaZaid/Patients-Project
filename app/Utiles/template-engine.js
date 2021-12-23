class templateEngineClass {

    init = () => {

    }

    renderTemplate = (templateString, data) => {
        const item = templateString.match(/(?<={{).*?(?=}})/g);
        for (var i = 0; i < item.length; i++) {
            const number = item[i].search(","); //to check if the value want to be formatted
            const bracketTemplateStringItems = "{{" + item[i] + "}}";
            if (number == -1) {
                const value = data[item[i]];
                templateString = templateString.replace(bracketTemplateStringItems, value)
            } else {
                const templateStringItemArray = bracketTemplateStringItems.match(/(?<={{|,).*?(?=}}|,)/g);
                const value = data[templateStringItemArray[0]];
                const formattedValue = this.formatValue(value, templateStringItemArray[1], 
                    templateStringItemArray[2]);
                templateString = templateString.replace(bracketTemplateStringItems, formattedValue);
            }
        }
        return templateString;
    }

    formatValue = (value, formatterName, formatterParameter) => {
        let formattedValue;
        switch (formatterName) {
            case "date":
                formattedValue = this.datePipe(value, formatterParameter)
                break;
            case "gender":
                formattedValue = this.genderPipe(value);
                break;
            case "status":
                formattedValue = this.statusPipe(value);
        }
        return formattedValue;
    }
    datePipe = (value, format) => {
        if (format == "dd/mm/yyyy" || format == undefined) {
            const date = moment(value);
            return date.format("DD/MM/YYYY");
        }
    }
    genderPipe = (value) => {
        if (value == 1) {
            return "male";
        } else {
            return "female";
        }
    }
    statusPipe = (value) => {
        if (value == 0) {
            return "not active";
        } else {
            return "active";
        }
    }
}
var templateEngine = new templateEngineClass();