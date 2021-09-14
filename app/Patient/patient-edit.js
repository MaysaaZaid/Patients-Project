class patientEditClass {
    constructor() {
        this.patientId = null;
        this.formMode = null;
    }

    init = () => {
        $(".p-save").click(this.onSaveButtonClick);
    }

    show = (ID) => {
        if (!ID) {
            this.formMode = "new";
            this.patientId = null;
            this.resetDataForm();
        } else {
            this.formMode = "edit";
            this.patientId = ID;
            const patient = dataService.get(ID);
            this.loadFormControls(patient);
        }
        routerEngine.navigate("patient-edit")
    }

    onSaveButtonClick = () => {
        const patient = this.getFormControlsData();
        if (!this.validateForm(patient)) {
            return (false);
        }
        if (this.formMode == "edit") {
            dataService.update(patient, this.patientId);
        } else {
            dataService.add(patient);
        }
        patientList.show();
    }

    loadFormControls = (patient) => {
        $(".fname").val(patient.fname);
        $(".mname").val(patient.mname);
        $(".lname").val(patient.lname);
        $(".status").val(patient.status);
        $(".form-check-input").attr('checked',patient.Active);
        $(".email").val(patient.email);
        let date = patient.DOB;
        date = date.toISOString().substr(0, 10);
        $(".DOB").val(date);
        let lastCheckDate = patient.lastCheck;
        lastCheckDate = lastCheckDate.toISOString().substr(0, 10);
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
            DOB: patientDOB, gender: patientGender, email: patientEmail, age: patientAge, lastCheck: patientLastCheck,
            status: patientStatus, Active: patientActive, creationDate: patientLastCheck, CreatedBy: 1
        };
        return newPatient
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
    validateForm = (patient) => {
        const isValid = true;
        $(".validationComment").hide();
        if (patient.age == "" || isNaN(patient.age) || patient.age < 6 || patient.age > 130) {
            $(".ageErrorComment").show();
            isValid = false;
        }
        if (patient.fname == "") {
            $(".fnameErrorComment").show();
            isValid = false;
        }
        if (patient.mname == "") {
            $(".mnameErrorComment").show();
            isValid = false;
        }
        if (patient.lname == "") {
            $(".lnameErrorComment").show();
            isValid = false;
        }
        if (patient.status == "") {
            $(".statusErrorComment").show();
            isValid = false;
        }
        if (patient.email == "") {
            $(".emailErrorComment").show();
            isValid = false;
        }
        if (patient.DOB == "") {
            $(".DOBErrorComment").show();
            isValid = false;
        }
        if (patient.lastCheck == "") {
            $(".lastCheckErrorComment").show();
            isValid = false;
        }
        if (patient.gender == "") {
            $(".genderErrorComment").show();
            isValid = false;
        }

        return isValid
    }
}

const patientEdit = new patientEditClass();



