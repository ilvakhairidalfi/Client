//$(document).ready(function () {
//    var table = $('#tableMVC').DataTable({
//        // ajax: {
//        //     // url di swapi
//        //     url: 'https://swapi.dev/api/planets/',
//        //     // dataType: 'json',
//        //     dataSrc: 'results'
//        // },
//        columns: [
//            {
//                data: null,
//                render: function (data, type, row, meta) {
//                    return meta.row + meta.settings._iDisplayStart + 1;

//                    // render untuk custom datanya
//                }
//            },
//            { data: 'Name' },
//            { data: 'DivisionID' }
//        ],

//        /* untuk filter yg akan ditampilkan, di web datatables >> extension> buttons (bisa juga nampilin pdf sm excel)
//            caranya :
//                - ceklis yg diperlukan, visible, pdf, excel
//                - dibawah link uncheck, trus copy ke index.html, link diatas, script dibawah
//                - lalu tambahkan :
//        */
//        //dom: 'Bfrtip',
//        //buttons: [
//        //    'colvis', 'pdf', 'excel'
//        //],
//    });

    
//});