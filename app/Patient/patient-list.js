class patientListClass {

    init = () => {
        $(".add-patient").click(this.onAddPatientClick)
        this.show();
    }

    show =()=>{
        this.renderTable();
        routerEngine.navigate("patient-list")
    }

    renderTable = () => {
        $('.patients-table-body').empty();
        const templateString = $(".patient-row-template").html();
        const patients = dataService.getAll();
        for (let i = 0; i < patients.length; i++) {
            const patient = patients[i];
            const tableEle = templateEngine.renderTemplate(templateString, patient);
            $(".patients-table-body").append(tableEle);
        }
        this.addEditClickEvent();
    }

    addEditClickEvent = () => {
        $(".patient-edit-button").click(
            this.onEditPatientClick
        )
    }

    onEditPatientClick = (e) => {
        const editRow = $(e.target).closest("tr");
        const ID = editRow.data("id");
        patientEdit.show(ID);
    }

    onAddPatientClick() {
        patientEdit.show();
    }
}

const patientList = new patientListClass();

