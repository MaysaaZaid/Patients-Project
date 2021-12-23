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
            let validationInputType = component.data("validation");
            let validationInputName = component.data("name");
            switch (validationInputType) {
                case "required":
                    if (!this.validateRequireField(validationInputType, validationInputValue)) {
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
                var radioInputValue = $("input[class=" + value + "]:checked").val();
                if (radioInputValue == undefined) {
                    isValid = false;
                } else {
                    isValid = true;
                }
                break;
            case (type != "radio"):
                if (value == "" || value == null) {
                    isValid = false;
                } else {
                    isValid = true;
                }
                break;
        }
        return isValid;
    }

    validatePositiveNumberField = (value) => {
        let pattern = /^[1-9]\d*/g;
        if (pattern.test(value) && value !== '') {
            return true;
        } else {
            return false;
        }
    }
    validateEmailField = (email) => {
        let number = email.search(/[A-z0-9\.]+@[A-z0-9]+\.[A-z]+$/g);
        if (email != "" && number == -1) {
            return false;
        } else {
            return true;
        }
    }
    showError = (component) => {
        component.addClass("is-invalid");
        component.siblings('.error-message').show();
    }
}
let validationEngine = new validationEngineClass();