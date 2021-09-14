class dataServiceClass {
    init = () => {

    }
    getAll() {
        return patientsData;
    }
    get = (ID) => {
        return patientsData.find(element => element.ID == ID);
    }
    update = (newPatient, newPatientID) => {
        const oldPatient = this.get(newPatientID)
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
    }

    add = (patient) => {
        const newPatientId = this.getNewId();
        patient.ID = newPatientId;
        patientsData.push(patient);
    }

    getIndexById = (ID) => {
        const patient = patientsData.find(element => element.ID == ID);
        return patientsData.indexOf(patient)
    }

    getNewId = () => {
        let max = patientsData[0].ID;
        patientsData.forEach(element => {
            if (max < element.ID) {
                max = element.ID;
            }
        });
        return max + 1
    }
}
const dataService = new dataServiceClass();