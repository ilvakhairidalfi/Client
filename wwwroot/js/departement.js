$(document).ready(function () {
    $('#tableDepartement').DataTable({
        ajax: {
            url: 'https://localhost:7156/api/Departements',
            datasrc: 'data',
            type: "GET",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "id", },
            { data: "name", },
            { data: "divisionId", },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="detailDep('${data.id}')">Details</button> 
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDep('${data.id}')">Edit</button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal onclick="deleteDep('${data.id}')">Delete</button>`;
                }
            },
        ],
        dom: 'Bfrtip',
        butttons: [ 'colvis', 'excel', 'pdf'],
    });
});

function detailDep(id) {
    $.ajax({
            url: `https://localhost:7156/api/Departements/${id}`,
            type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" readonly placeholder="${res.data.name}" value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.divisionId}" value="${res.data.divisionId}">
                `;
        // console.log(temp);
        $("#detailDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function deleteDep(id) {
    $.ajax({
        url: `https://localhost:7156/api/Departements/${id}`,
        method: "DELETE"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" readonly placeholder="${res.data.name}" value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.divisionId}" value="${res.data.divisionId}">
                `;
        // console.log(temp);
        $("#deleteDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function editDep(id) {
    $.ajax({
        url: `https://localhost:7156/api/Departements/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" placeholder="${res.data.name}" value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" placeholder="${res.data.divisionId}" value="${res.data.divisionId}">
                `;
        // console.log(temp);
    $("#editDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function createDep() {
    $.ajax({
        url: `https://localhost:7156/api/Departements`,
        type: "POST"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" placeholder="${res.data.name}" value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" placeholder="${res.data.divisionId}" value="${res.data.divisionId}">
                `;
        // console.log(temp);
        $("#createDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}








