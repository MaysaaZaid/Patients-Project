class patientEditClass {
    constructor() {
        this.patientId = null;
        this.formMode = null;
    }

    init = () => {
        $(".p-save").click(this.onSaveButtonClick);
        $(".confirm-btn").click(this.onConfirmButtonClick);
    }

    show = (ID) => {
        this.initializeValidation();
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
        this.initializeValidation();
        //--------------------
        //** Validation
        if (!validationEngine.validateForm()) {
         dataService.toastr();
            toastr["error"]("Save failed", "error");
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
            $(".male").attr('checked', true);
        } else {
            $(".female").attr('checked', true);
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
            fname: patientFirstName,
            mname: patientMiddleName,
            lname: patientLastName,
            DOB: patientDOB,
            gender: patientGender,
            email: patientEmail,
            age: patientAge,
            lastCheck: patientLastCheck,
            status: patientStatus,
            Active: patientActive,
            creationDate: patientLastCheck,
            CreatedBy: 1
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
        $("[name='gender']").prop('checked', false);
        $(".age").val("");
    }
     onConfirmButtonClick = () =>{
        dataService.delete(this.patientId);  
        patientList.show();
        dataService.toastr();
        toastr["success"]("patient removed successfully", "Done");
    }
    initializeValidation = () => {
        $(".error-message").hide();
        $(".errorBox").text("");
        $("[data-validation]").removeClass("is-invalid");
    }
}

const patientEdit = new patientEditClass();



