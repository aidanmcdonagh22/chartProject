var i = 1;
var dateDiff = -1;

function addInputs(){
  addToGraph(('start'+ i), ('finish'+ i));
  if (dateDiff > 0){
    i++;
    var buttonDecrement = (i - 1);
    var div = document.createElement('tr');
    div.innerHTML =
    '<td>'+i+'</td><td><input = type="text" id="description_'+i+'" ></td>'+
    '<td><input type="date" id="start'+i+'"/></td>'+
    '<td><input type="date" id="finish'+i+'"/></td>'+
    '<td><input type="number" id="prerequistes_'+i+'"/></td>'+
    '<td><input type="button" id="add_input'+i+'" style="display:block" onClick="addInputs()" value="+"/>'+
    '<input type="button" id="remove_input'+i+'" style="display:none" onClick="removeInputs(this)" value="-"/>'+
    '</td>'
    document.getElementById('gantt').appendChild(div);

    toggle_task_button('add_input'+ buttonDecrement);
    if(i > 2 ){
      toggle_task_button('remove_input'+ buttonDecrement);
    }

  }
}


function toggle_task_button(id){
  var button = document.getElementById(id);

  if (button.style.display == 'none'){
    button.style.display = 'block';
  }else{
    button.style.display = 'none';
  }
}

function removeInputs(row){
  var parent = row.parentNode.parentNode;
  parent.parentNode.removeChild(parent);

}

function addToGraph(earlyDate, laterDate){
  var date1 = new Date(document.getElementById(earlyDate).value);
  var date2 = new Date(document.getElementById(laterDate).value);
  console.log(date1);
  console.log(date2);
  var difference = date2 - date1;
  var days = difference/(24*3600*1000);
  dateDiff = days;
  console.log(difference);
  console.log(days);
  if (days < 0 ){
    window.alert("The start date must be earlier than the finish date!");
  }else{
    
  }

}
