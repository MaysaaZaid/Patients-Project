class patientListClass {

    init = () => {
        $(".add-patient").click(this.onAddPatientClick)
        this.renderTable();
    }

    show =()=>{
        this.renderTable();
        routerEngine.navigate("patient-list")
    }

    renderTable = () => {
        $('.patients-table-body').empty();
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
        var editRow = $(e.target).closest("tr");
        var ID = editRow.data("id");
        patientEdit.show(ID);
    }

    onAddPatientClick() {
        patientEdit.show();
    }
}

var patientList = new patientListClass();

