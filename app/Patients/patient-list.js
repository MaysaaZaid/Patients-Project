class patientListClass {

    init = () => {
        $(".add-patient").click(this.onAddPatientClick)
        this.show();
    }

    show = () => {
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
        this.addDeleteClickEvent();
    }

    addEditClickEvent = () => {
        $(".patient-edit-button").click(
            this.onEditPatientClick
        )
    }

    addDeleteClickEvent = () => {
        $(".delete").click(
            this.onDeletePatientClick
        )
    }

    onEditPatientClick = (e) => {
        const editRow = $(e.target).closest("tr");
        const ID = editRow.data("id");
        patientEdit.show(ID);
    }

    onDeletePatientClick(e) {
        const deleteRow = $(e.target).closest("tr");
        const ID = deleteRow.data("id");
        dataService.delete(ID);
        patientList.show();
    }

    onAddPatientClick() {
        patientEdit.show();
    }
}

const patientList = new patientListClass();

