class patientEditClass {
    constructor() {
        this.patientId = null;
        this.formMode = null;
    }

    init = () => {
        $(".p-save").click(this.onSaveButtonClick);
        $(".p-delete").click(this.onDeleteButtonClick);
    }

    show = (ID) => {
        if (!ID) {
            this.formMode = "new";
            this.patientId = null;
            $(".p-delete")[0].disabled = true;
            this.resetDataForm();
        } else {
            this.formMode = "edit";
            this.patientId = ID;
            const patient = dataService.get(ID);
            this.loadFormControls(patient);
        }
        routerEngine.navigate("patient-edit");
    }

    onSaveButtonClick = () => {
        const patient = this.getFormControlsData();
        //--------------------
        //** Validation
        
        if (!this.validateForm(patient)) {
            return;
        }
        //-------------------
        if (this.formMode == "edit") {
            dataService.update(this.patientId, patient);
        } else {
            dataService.add(patient);
        }
        //------------------
        patientList.show();
    }

    onDeleteButtonClick = () => {
        dataService.delete(this.patientId);
        patientList.show();
    }

    loadFormControls = (patient) => {
        $(".fname").val(patient.fname);
        $(".mname").val(patient.mname);
        $(".lname").val(patient.lname);
        $(".status").val(patient.status);
        $(".form-check-input").attr('checked', patient.Active);
        $(".email").val(patient.email);
        const date = moment(patient.DOB).format("YYYY-MM-DD");
        $(".DOB").val(date);
        const lastCheckDate = moment(patient.lastCheck).format("YYYY-MM-DD");
        $(".check").val(lastCheckDate);
        const gender = patient.gender;
        if (gender == "1") {
            $("[name='1']").attr('checked', true);
        } else {
            $("[name='2']").attr('checked', true);
        }
    }

    getFormControlsData = () => {
        const patientFirstName = $(".fname").val();
        const patientMiddleName = $(".mname").val();
        const patientLastName = $(".lname").val();
        const patientStatus = $(".status").val();
        const patientEmail = $(".email").val();
        const patientAge = $(".age").val();
        const gender = $("input[type='radio']:checked").val();
        let patientGender = "";
        if (gender == "male") {
            patientGender = "1";
        } else if (gender == "female") {
            patientGender = "2";
        } else {
            patientGender = "";
        }
        const patientDOB = $(".DOB").val();
        const patientLastCheck = $(".check").val();
        let patientActive = $("input[name=active]:checked").val();
        if (patientActive == "on") {
            patientActive = "true";
        } else {
            patientActive = "false";
        }
        const newPatient = {
            fname: patientFirstName, mname: patientMiddleName, lname: patientLastName,
            DOB: patientDOB, gender: patientGender, email: patientEmail, age: patientAge,
            lastCheck: patientLastCheck, status: patientStatus, Active: patientActive,
            creationDate: patientLastCheck, CreatedBy: 1
        };
        return newPatient;
    }

    resetDataForm = () => {
        $(".fname").val("");
        $(".mname").val("");
        $(".lname").val("");
        $(".status").val("active");
        $(".form-check-input").attr('checked', false);
        $(".email").val("");
        $(".DOB").val("");
        $(".check").val("");
        $("[name='1']").attr('checked', false);
        $("[name='2']").attr('checked', false);
    }

    validateForm = () => {
        let isValid = true;
        $(".validationComment").hide();
        $(".fname,.mname,.lname,.status,.email,.DOB,.check,.age").removeClass("is-invalid");
        if ($(".fname").val() == "") {
            $(".fnameErrorComment").show();
            $(".fname").addClass("is-invalid");
            isValid = false;
        }
        if ($(".mname").val() == "") {
            $(".mnameErrorComment").show();
            $(".mname").addClass("is-invalid");
            isValid = false;
        }
        if ($(".lname").val() == "") {
            $(".lnameErrorComment").show();
            $(".lname").addClass("is-invalid");
            isValid = false;
        }
        if ($(".status").val() == null) {
            $(".statusErrorComment").show();
            $(".status").addClass("is-invalid");
            isValid = false;
        }
        const email = $(".email").val()
        const number=email.search(/[A-z0-9\.]+@[A-z0-9]+\.[A-z]+$/g);
        if (number == -1) {
            $(".emailErrorComment").show();
            $(".email").addClass("is-invalid");
            isValid = false;
        }
        if ($(".DOB").val() == "") {
            $(".DOBErrorComment").show();
            $(".DOB").addClass("is-invalid");
            isValid = false;
        }
        if ($(".check").val() == "") {
            $(".lastCheckErrorComment").show();
            $(".check").addClass("is-invalid");
            isValid = false;
        }
        if ($("input[class='gender']:checked").val() == undefined) {
            $(".genderErrorComment").show();
            isValid = false;
        }
        if ($(".age").val() == "" || isNaN($(".age").val()) || $(".age").val() < 6 || $(".age").val() > 130) {
            $(".ageErrorComment").show();
            $(".age").addClass("is-invalid")
            isValid = false;
        }

        return isValid;
    } 
}

const patientEdit = new patientEditClass();



