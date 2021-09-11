class dataServiceClass {
    init = () => {

    }
    getIndexById = (ID) => {
        var patient = "";
        for (var i = 0; i < patientsData.length; i++) {
            if (ID == patientsData[i].ID) {
                patient = patientsData[i];
                break;
            }
        }
        return (i)
    }
    getPatientById = (ID) => {
        var patient = "";
        for (var i = 0; i < patientsData.length; i++) {
            if (ID == patientsData[i].ID) {
                patient = patientsData[i];
                break;
            }
        }
        return (patient)
    }
    add = (patient) => {
        debugger;
        var newPatientId = this.getNewId();
        patient.ID = newPatientId;
        patientsData.push(patient);
        patientList.open();
        routerEngine.navigate("patient-list")
    }

    getNewId = () => {

        var max = patientsData[0].ID;
        for (var i = 0; i < patientsData.length; i++) {
            if (max < patientsData[i].ID) {
                max = patientsData[i].ID;
            }
        }
        return (max + 1)
    }

    update = (patientId) => {
        patientEdit.formMode = null;
        var ID = patientId;
        var oldPatient = this.getPatientById(ID);
        var modifiedPatient = patientEdit.getData();
        oldPatient.ID = ID;
        oldPatient.fname = modifiedPatient.fname;
        oldPatient.mname = modifiedPatient.mname;
        oldPatient.lname = modifiedPatient.lname;
        oldPatient.DOB = modifiedPatient.DOB;
        oldPatient.gender = modifiedPatient.gender;
        oldPatient.email = modifiedPatient.email;
        oldPatient.lastCheck = modifiedPatient.lastCheck;
        oldPatient.status = modifiedPatient.status;
        oldPatient.Active = modifiedPatient.Active;
        oldPatient.creationDate = modifiedPatient.creationDate;
        oldPatient.CreatedBy = modifiedPatient.CreatedBy;
        patientList.open();
        routerEngine.navigate("patient-list");

    }

    getAll() {
        return (patientsData);
    }
}
var dataService = new dataServiceClass();