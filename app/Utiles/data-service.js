class dataServiceClass {
    init = () => {

    }
    getAll=() =>{
        return patientsData;
    }
    get = (ID) => {
        return patientsData.find(element => element.ID == ID);
    }
    getIndexById = (ID) => {
        const patient = patientsData.find(element => element.ID == ID);
        return patientsData.indexOf(patient);
    }
    add = (patient) => {
        const newPatientId = this.getNewId();
        patient.ID = newPatientId;
        patientsData.push(patient);
        toastr["success"]("Patient added successfully", "Done");
    }
    update = (ID, newPatient) => {
        const oldPatient = this.get(ID);
        oldPatient.fname = newPatient.fname;
        oldPatient.mname = newPatient.mname;
        oldPatient.lname = newPatient.lname;
        oldPatient.DOB = newPatient.DOB;
        oldPatient.gender = newPatient.gender;
        oldPatient.email = newPatient.email;
        oldPatient.lastCheck = newPatient.lastCheck;
        oldPatient.status = newPatient.status;
        oldPatient.Active = newPatient.Active;
        oldPatient.creationDate = newPatient.creationDate;
        oldPatient.CreatedBy = newPatient.CreatedBy;
        this.toastr();
        toastr["success"]("Patient data modified successfully", "Done");
    }
    delete = (ID) => {
            const patientIndex = this.getIndexById(ID);
            var removedObj=patientsData.splice(patientIndex, 1);
            return removedObj;   
    }
    getNewId = () => {
        let max = patientsData[0].ID;
        patientsData.forEach(element => {
            if (max < element.ID) {
                max = element.ID;
            }
        });
        return max + 1;
    }
    toastr = ()=>{
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
   }
}
}
const dataService = new dataServiceClass();