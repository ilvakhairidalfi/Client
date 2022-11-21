$(document).ready(function () {
    $('#tableDepartement').DataTable({
        ajax: {
            url: 'https://localhost:7156/api/Departements',
            datasrc: '',
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
                    return `<a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal"
                            onclick="detailDep('${data.id}')">Details</a> 
                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"
                            onclick="editDep('${data.id}')">Edit</a>
                        <a type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal
                            onclick="deleteDep('${data.id}')"">Delete</a>`;
                }
            }
        ]
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
                <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
                <h5>Id : <h5><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.Id}" value="${res.data.Id}">
                <h5>Name : <h5><input type="text" id="depName" class="form-control" readonly placeholder="${res.data.Name}" value="${res.data.Name}">
                <h5>Division Id : <h5><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.DivisionId}" value="${res.data.DivisionId}">
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
        type: "DELETE"
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
                 <input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
                <h5>Id : <h5><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.Id}" value="${res.data.Id}">
                <h5>Name : <h5><input type="text" id="depName" class="form-control" readonly placeholder="${res.data.Name}" value="${res.data.Name}">
                <h5>Division Id : <h5><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.DivisionId}" value="${res.data.DivisionId}">
                `;
        // console.log(temp);
    $("#editDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}








