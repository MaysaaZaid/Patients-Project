class patientEditClass {
    constructor() {
        this.patientId = null;
        this.formMode = null;
    }

    init = () => {
        $(".p-save").click(this.onSaveButtonClick);
    }

    open = (ID) => {
        if (ID == undefined) {
            this.resetDataForm();
        } else {
            var patient = dataService.getPatientById(ID);
            this.loadData(patient);
        }
        routerEngine.navigate("patient-edit")
    }

    onSaveButtonClick = () => {
        var patient = this.getData();
        var isValidate = this.validateForm(patient);
        debugger;
        if (isValidate == false) {
            return (false);
        } else {
            if (this.formMode == "edit") {
                dataService.update(this.patientId);
            } else {
                dataService.add(patient);
            }
        }
    }
    validateForm = (patient) => {

        var isValidate = true;

        $(".validationComment").hide();
        if (patient.age == "" || isNaN(patient.age) || patient.age < 6 || patient.age > 130) {
            $(".ageErrorComment").show();
            isValidate = false;
        }
        if (patient.fname == "") {
            $(".fnameErrorComment").show();
            isValidate = false;
        }
        if (patient.mname == "") {
            $(".mnameErrorComment").show();
            isValidate = false;
        }
        if (patient.lname == "") {
            $(".lnameErrorComment").show();
            isValidate = false;
        }
        if (patient.status == "") {
            $(".statusErrorComment").show();
            isValidate = false;
        }
        if (patient.email == "") {
            $(".emailErrorComment").show();
            isValidate = false;
        }
        if (patient.DOB == "") {
            $(".DOBErrorComment").show();
            isValidate = false;
        }
        if (patient.lastCheck == "") {
            $(".lastCheckErrorComment").show();
            isValidate = false;
        }
        if (patient.gender == "") {
            $(".genderErrorComment").show();
            isValidate = false;
        }

        return (isValidate)
    }


    loadData = (patient) => {
        $("#fname").val(patient.fname);
        $("#mname").val(patient.mname);
        $("#lname").val(patient.lname);
        var status = patient.status;
        if (status == 0) {
            $("#status").val("notactive");
        } else {
            $("#status").val("active");
        }
        var patientActive = patient.Active;
        if (patientActive == true) {
            $(".form-check-input").attr('checked', true);
        } else {
            $(".form-check-input").attr('checked', false);
        }
        $("#email").val(patient.email);
        var date = patient.DOB;
        var age = date.toISOString().substr(0, 10);
        $("#DOB").val(age);
        var lastCheck = patient.lastCheck;
        var lastCheckDate = lastCheck.toISOString().substr(0, 10);
        $("#check").val(lastCheckDate);
        var gender = patient.gender;
        if (gender == "1") {
            $("[name='1']").attr('checked', true);
        } else {
            $("[name='2']").attr('checked', true);

        }
    }

    getData = () => {

        var patientFirstName = $("#fname").val();
        var patientMiddleName = $("#mname").val();
        var patientLastName = $("#lname").val();
        var patientStatus = $("#status").val();
        var patientEmail = $("#email").val();
        var patientAge = $("#age").val();
        var gender = $("input[type='radio']:checked").val();
        var patientGender = "";
        if (gender == "male") {
            patientGender = "1";
        } else if (gender == "female") {
            patientGender = "2";
        } else {
            patientGender = "";
        }
        var patientDOB = $("#DOB").val();
        var patientLastCheck = $("#check").val();
        var patientActive = $("input[name=active]:checked").val();
        if (patientActive == "on") {
            patientActive = "true";
        } else {
            patientActive = "false";
        }
        var newPatient = {
            fname: patientFirstName, mname: patientMiddleName, lname: patientLastName,
            DOB: patientDOB, gender: patientGender, email: patientEmail, age: patientAge, lastCheck: patientLastCheck,
            status: patientStatus, Active: patientActive, creationDate: patientLastCheck, CreatedBy: 1
        };
        return (newPatient)
    }


    resetDataForm = () => {
        $("#fname").val("");
        $("#mname").val("");
        $("#lname").val("");
        $("#status").val("active");
        $(".form-check-input").attr('checked', false);
        $("#email").val("");
        $("#DOB").val("");
        $("#check").val("");
        $("[name='1']").attr('checked', false);
        $("[name='2']").attr('checked', false);
    }
}

var patientEdit = new patientEditClass();



