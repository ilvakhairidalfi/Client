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
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal"
                            onclick="detailDep('${data.id}')">Details</button>

                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"
                            onclick="editDep('${data.id}')">Edit</button>

                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                            onclick="deleteId('${data.id}', '${data.name}')">Delete</button>`;
                }
            },
        ],
        dom: 'Bfrtip',
        butttons: ['colvis', 'excel', 'pdf'],
    });
});

// Create
function createDep() {
    var createItem = {};
    createItem.name = $('#departementName').val();
    createItem.divisionId = $('#divisionId').val();
    if (createItem) {
        $.ajax({
            url: `https://localhost:7156/api/Departements`,
            type: "POST",
            data: JSON.stringify(createItem),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                Swal.fire("Added!", "Your Data Added Successfully!", "success")
                    .then(function () {
                        location.reload();
                    });
            },
            error: function () {
                Swal.fire("Oops", "Your data is not saved!", "error");
            }

        });
    }
}

// Delete
function deleteId(id, name) {
    let deleteButton = "";
    deleteButton = `<button class="btn btn-danger" onclick="deleteDep('${id}')">Delete</button>`

    let deleteName = "";
    deleteName = `<p>Are you sure want to delete this data ${name}?</p>`

    $("#btn-delete").html(deleteButton)
    $("#btn-deletename").html(deleteName)
}

function deleteDep(id) {
    $.ajax({
        url: `https://localhost:7156/api/Departements/${id}`,
        method: "DELETE",
        dataType: 'json',
        success: function () {
            Swal.fire("Deleted!", "This data was successfully deleted!", "success")
                .then(function () {
                    location.reload();
                });
        },
    })
}

// Detail
function detailDep(id) {
    $.ajax({
        url: `https://localhost:7156/api/Departements/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}"
                    value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" readonly placeholder="${res.data.name}"
                    value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.divisionId}"
                    value="${res.data.divisionId}">
                `;
        // console.log(temp);
        $("#detailDepartement").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

// Edit
function editDep(id) {
    $.ajax({
        url: `https://localhost:7156/api/Departements/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="depId" class="form-control" readonly placeholder="${res.data.id}"
                    value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="depName" class="form-control" placeholder="${res.data.name}"
                    value="${res.data.name}">
                <h6>Division Id : <h6><input type="text" id="divId" class="form-control" placeholder="${res.data.divisionId}"
                    value="${res.data.divisionId}">
                `;
        // console.log(temp);
        $("#editDepartement").html(temp);
    });
}

function saveEdit() {
    var createSave = {};
    createSave.id = $('#depId').val();
    createSave.name = $('#depName').val();
    createSave.divisionId = $('#divId').val();
    if (createSave) {
        $.ajax({
            url: `https://localhost:7156/api/Departements`,
            type: "PUT",
            data: JSON.stringify(createSave),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                Swal.fire("Updated!", "Your Data Updated Successfully!", "success")
                    .then(function () {
                        location.reload();
                    });
            },
            error: function () {
                Swal.fire("Oops", "Your data is not saved!", "error");
            }
        });
    }
}









