 function openForm() {
          document.getElementById("myForm").style.display = "block";
        }
        
        function closeForm() {
          document.getElementById("myForm").style.display = "none";
        }
    

  /////////////////////////////////////////// INSERT /////////////////////////////////////////////////////////////////
function save() {


  var reqDataJson =JSON.stringify({
    "id":$("#id").val(),
    "disposition_name":$("#DispositionName").val(),
    "disposition_status":$("#DispositionStatus").val(),
    "discription":$("#Discription").val(),
 });

  
   var reqjson = JSON.stringify({
       "serviceName" :"add",
       "requestData" :reqDataJson
   });

   execute(reqjson)
   
  }

///////////////////////////////////////////////GET DATA FROM DATABASE/////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  load();
    }); 






function load(){
  var reqjson = JSON.stringify({
    "serviceName" :"display",
    "requestData" : ""
  });
  execute(reqjson)
}

function display(responsedata){
  var value = responsedata;
  var _tbody = $('#tbody');
_tbody.html('');
var _html = "";
$.each(value, function (i, el) {
    _html += `<tr id="${el.ID}">`;
    _html += `<td id="ID">${el.ID}</td>`;
    _html += `<td id="dname">${el.disposition_name}</td>`;
    _html += `<td id="status">${el.disposition_status}</td>`;
    _html += `<td id="discription">${el.discription}</td>`; 
    // _html += `<td align="center">${el.id}</td>`;
    // _html += `<td align="center">${el.id}</td>`;
    _html += `<td> <a title="Edit" data-id="${el.ID}" id="edit" class="fa fa-edit edit-btn"></a> <a  title="Save" hidden="hidden"  id="save" data-id="${el.ID}"  ><i class="fa fa-save" style="font-size:15px"></i></a></td >`;
    _html += `<td> <a title="Delete" data-id="${el.ID}" id="delete" class="fa fa-trash delete-btn"></a> </td >`;
    _html += `</tr>`;

});
_tbody.append(_html);
$('#table').DataTable({
  destroy: true,
  iDisplayLength: 10,
  order: [],
  columnDefs: [{ orderable: false, targets: [4, 5] }]
});


}
//////////////////////////////////////////////DELETE//////////////////////////////////////////////////////////////////////////////


  $(document).on("click", '#delete', function () {

    window.location.reload(); 
    var DeleteId = $(this).data("id");
    parse = JSON.parse(DeleteId);
    deleteTable(DeleteId); 
});
function deleteTable(id) {
  /*$("#DeletetableID").val(id); */

  var reqDataJson =JSON.stringify({
    "id": id
  });
     var reqjson = JSON.stringify({
         "serviceName" :"delete",
         "requestData" :reqDataJson
     });
     execute(reqjson)
     alert(" Deleted success...");
 
}
//////////////////////////////////////////////EDIT TABLE////////////////////////////////////////////////////////////////////////

$(document).on("click",'#edit',function(){


  var editDataid = $(this).data("id");
  editId = $("#" + editDataid + " #ID").text();
  editName = $("#" + editDataid + " #dname").text();
  editStatus = $("#" + editDataid + " #status").text();
  editDiscription = $("#" + editDataid + " #discription").text();


  // $("#fname").val($(this).closest('tr').find('.first').text());
  

 $("#ID").val($(this).closest('tr').find('#ID').html('<input type="text" id="saveid"  value="' + editId + '"/>'));
 $("#dname").val($(this).closest('tr').find('#dname').html('<input type="text" id="savename"  value="' + editName + '"/>'));
 $(this).closest('tr').find('#status').html('<input type="text" id="savestatus" value="' + editStatus + '"/>');
 $(this).closest('tr').find('#discription').html('<input type="text" id="savediscription" value="' + editDiscription + '"/>');


  $(this).siblings('#save').show();   
        $(this).hide(); 

        $(document).on("click","#save",function(){

        
          window.location.reload(); 
          var reqDataJson =JSON.stringify({
            "id":$("#saveid").val(),
            "disposition_name":$("#savename").val(),
            "disposition_status":$("#savestatus").val(),
            "discription":$("#savediscription").val(),
         });

       
         
         var reqjson = JSON.stringify({
          "serviceName" :"update",
          "requestData" :reqDataJson
      });
      alert("success..."); 
      execute(reqjson)
        

        });

          
          
           
 

    // $('#edit').click(function () {
    //    if ($('#edit').is(':hidden')) {
    //        $('#edit').show();
    //    } else {
    //        $('#edit').hide();
    //        $('#save').show();
    //    }
    //  }); 
 
 
})





          



















   






//////////////////////////////////////////////EXECUTE AJAX////////////////////////////////////////////////////////////////////////


function execute(executedata){
 
  $.ajax({
    url: WidgetMiddlewareURL + "/postrequest",
    type: 'POST',
   // data: JSON.stringify(_request),
  //  data:_request,
    data:executedata,
    cache: false,
    contentType: false,
    processData: false,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    success: function (response) {
         var _jsonData = response;
        
         display(_jsonData);
      
         console.log("Success..!" +response);
         
},
failure: function () {
 console.log("Failed..!");
}
});
 }

//  objTimeount = setTimeout(function () {
//   refreshAgentDashboardEvent();
// }, autoRefreshTime * 1000);

 function refreshDashboardEvent(){

  load();
}


//  function autoRefresh() {
//   refreshDashboardEvent()
  
//  }
//  setInterval('autoRefresh()', 1000);

//  setInterval(function() {
//   // refreshDashboardEvent()
//   window.location.reload(); 
// }, 5000);


    




















//    var reqDataJson ={
//   "id":myid,
//   "disposition_name":DispositionName,
//   "disposition_status":DispositionStatus,
//   "discription":Discription,
// };

//    WidgetTypeExecuteWebRequest(reqUrl, "POST",reqjson); 
// var reqDataJson ={
//       "id":myid,
//       "disposition_name":DispositionName,
//       "disposition_status":DispositionStatus,
//       "discription":Discription,
//    };
  

// function WidgetTypeExecuteWebRequest(requestUrl, httpMethodType, requestData) {
 
//   $.ajax({
//       url: requestUrl,
//       type: httpMethodType,
//       data: requestData,
//       cache: false,
//       contentType: false,
//       processData: false,
//       headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//       },
//       success: function (response) {
//            var _jsonData = response;
//           // WidgetTypeRedirectAction(_jsonData,serviceType, requestData);
//           console.log("ajaxsuccess");
//   },
//   failure: function () {
//     console.log("ajaxerror");
//   }
//   });
// }

  //  var myid = $("#id").val();
  //  var DispositionName =$("#DispositionName").val();
  //  var DispositionStatus = $("#DispositionStatus").val();
  //  var Discription=$("#Discription").val();
 
  //  var reqDataJson =JSON.stringify({
  //     "id":myid,
  //     "disposition_name":DispositionName,
  //     "disposition_status":DispositionStatus,
  //     "discription":Discription,
  //  });

  // var _request={
  //   "serviceName" : "add",
  //   "requestData" : reqjson 
  //  // "requestData" : reqDataJson
  //     }

  

  // var table = document.getElementById("tbody"),rIndex;
  // for(var i = 1; i < table.rows.length; i++)
  // {
  //     table.rows[i].onclick = function()
  //     {
  //         rIndex = this.rowIndex;
  //         console.log(rIndex);
          
  //         document.getElementById("DispositionName").value = this.cells[0].innerHTML;
  //         document.getElementById("DispositionStatus").value = this.cells[1].innerHTML;
  //         document.getElementById("Discription").value = this.cells[2].innerHTML;
  //     };
  // }
  
  //     table.rows[rIndex].cells[0].innerHTML = document.getElementById("DispositionName").value;
  //     table.rows[rIndex].cells[1].innerHTML = document.getElementById("DispositionStatus").value;
  //     table.rows[rIndex].cells[2].innerHTML = document.getElementById("Discription").value;

  

  // $("#editid").val(editId);
  // $("DispositionName").val(editName);
  // $("DispositionStatus").val(editStatus);
  // $("Discription").val(editDiscription);