class validationEngineClass {
    init = () => {

    }
    validateForm = () => {
        let isValid = true;
        let errorBox = "";
        let validationControls = $("[data-validation]");
        for (var i = 0; i < validationControls.length; i++) {
            let component = $(validationControls[i]);
            let validationInputValue = component.val();
            let validationType = component.data("validation");
            let validationInputName = component.data("name");
            let inputType = component.attr("type");

            switch (validationType) {
                case "required":
                    if (!this.validateRequireField(inputType, validationInputValue)) {
                        errorBox += validationInputName + ",";
                        this.showError(component);
                        isValid = false;
                    }
                    break;
                case "email":
                    if (!this.validateEmailField(validationInputValue)) {
                        errorBox += validationInputName + ",";
                        this.showError(component);
                        isValid = false;
                    }
                    break;
                case "number":
                    if (!this.validatePositiveNumberField(validationInputValue)) {
                        errorBox += validationInputName + ",";
                        this.showError(component);
                        isValid = false;
                    }
            }
        }
        if (errorBox !== "") {
            $(".errorBox").text(errorBox + " is required");
            $(".errorBox").show();
        }
        return isValid;
    }
    validateRequireField = (type, value) => {
        let isValid = true;
        switch (true) {
            case (type == "radio"):
                debugger
                var radioInputValue = $("input[name=" + value + "]:checked").val();
                isValid = (radioInputValue !== undefined)
                break;
            case (type != "radio"):
                isValid = (value !== "");
                break;
        }
        return isValid;
    }

    validatePositiveNumberField = (value) => {
        let pattern = /^[1-9]\d*/g;
        const valid = pattern.test(value);
        return valid
    }
    validateEmailField = (email) => {
        let number = email.search(/[A-inputType0-9\.]+@[A-inputType0-9]+\.[A-inputType]+$/g);
        const valid = (email == "" || number !== -1);
        return valid;
    }
    showError = (component) => {
        component.addClass("is-invalid");
        component.siblings('.error-message').show();
    }
}
let validationEngine = new validationEngineClass();