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
            { data: "name", },
            { data: "divisionId", },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</a> 
                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"> Edit</a > 
                        <a type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</a>`;
                }
            }
        ]
    });
});

//function tableDepartement(id) {
//    $.ajax({
//            url: 'https://localhost:7156/api/Departements/${id}',
//            type: "GET"
//    }).done((res) => {
//        let temp = "";
//        temp += `<input type="hidden" class="form-control" id="hideId" readonly placeholder="" value="0">
//            <h5>id: <h5>input type="text" class="form-control" id="departId" placeholder="${res.data.id}" "value="${res.data.id}">
//            <h5>name: <h5>input type="text" class="form-control" id="departName" placeholder="${res.data.name}" "value="${res.data.name}">
//            `;

//    })
//});

//$(document).ready(function() {
//    $('#tableDelete').DataTable({
//        ajax: {
//            url: 'https://localhost:7156/api/Departements/${id}',
//            datasrc: '',
//            type: "GET",
//        },
//        columns: [
            
//            { data: "name", },
//            { data: "divisionId", }
//        ]
//    });
//});


//function delete(id) {
//    $.ajax({
//        url: 'https://localhost:7156/api/Departements/${id}',
//        type: "DELETE",
//    });
//}


