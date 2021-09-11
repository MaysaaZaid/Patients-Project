class patientListClass {

    init = () => {
        $(".add-patient").click(this.onAddPatientClick)
        this.renderTable();
    }

    open = () => {
        this.renderTable();
    }

    renderTable = () => {
        $(".patientRow").remove();
        var templateString = $(".patient-row-template").html();
        var patients = dataService.getAll();
        for (var i = 0; i < patients.length; i++) {
            var patient = patients[i];
            var tableEle = templateEngine.renderTemplate(templateString, patient);
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
        patientEdit.formMode = "edit";
        var editRow = $(e.target).closest("tr");
        var ID = editRow.data("id");
        patientEdit.patientId = ID;
        patientEdit.open(ID);
    }

    onAddPatientClick() {
        patientEdit.open();
    }
}

var patientList = new patientListClass();

