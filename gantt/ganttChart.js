function addInputs(row){
  //console.log(row);
  var parent = row.parentNode.parentNode;
  //console.log(parent);
  var cell = parent.childNodes[1].innerHTML;
  //console.log(cell);
  if (cell == 1){
    var s_date = parent.childNodes[5].childNodes[1].value;
    //console.log(s_date);
    var time = dateConverter(s_date);
    //console.log(time);
    //console.log("Task 1");
    if (isNaN(time)){
      window.alert("Please Enter a Start Date!");
    } else {
      addNewTask(cell);
      addNewGanttBar(cell);
    }

  } else {
    var start_task1 = parent.parentNode.childNodes[2];
    var task1_date = start_task1.childNodes[5].childNodes[1].value;
    //console.log(task1_date);
    var task1_time = dateConverter(task1_date);
    //console.log(task1_time);
    var cell = parent.childNodes[0].innerHTML;
    //console.log(cell2);
    var s_date = parent.childNodes[2].childNodes[0].value;
    //console.log(s_date);
    var start_time = dateConverter(s_date);
    //console.log(start_time);
    var f_date = parent.childNodes[3].childNodes[0].value;
    //console.log(f_date);
    var finish_time = dateConverter(f_date);
    //console.log(finish_time);
    if (start_time < task1_time || finish_time < task1_time){
      window.alert("Start Date and Finish Date must be After the Start Date!");
    } else {
      if (isNaN(start_time)|| isNaN(finish_time)){
        window.alert("Please Enter a Start Date and Finish Date!");
      } else {
        var dateDiff = dateCheck(start_time, finish_time);
        //console.log(dateDiff);
        if (dateDiff < 0){
          window.alert("Finish Date Must be Later than Start Date!");
        } else {
          addNewTask(cell);
          addNewGanttBar(cell);

          var bar = document.getElementById('task'+cell);
          adjustGanttBar(dateDiff, bar);
        }
      }

    }
  }

}

function dateConverter(date){
  var new_date = new Date((date));
  var date_number = new_date.getTime();
  return date_number;
}

function addNewTask(task){
  var taskNum = parseInt(task) + 1;
  //console.log(newTask);
  var table = document.getElementById('gantt');
  var row = table.insertRow(taskNum);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = '' + taskNum;
  cell2.innerHTML = '<input = type="text" id="description_'+taskNum+'" >';
  cell3.innerHTML = '<input type="date" id="start'+taskNum+'"/>';
  cell4.innerHTML = '<input type="date" id="finish'+taskNum+'"/>';
  cell5.innerHTML = '<input type="number" id="prerequistes'+taskNum+'"/>';
  cell6.innerHTML = '<input type="button" id="add_input'+taskNum+
  '"  onClick="addInputs(this)" value="+"/>'+
  '<input type="button" id="remove_input'+taskNum+
  '"  onClick="removeInputs(this)" value="-"/>';

  increaseTaskNumber(taskNum);

}

function removeInputs(row){
  var parent = row.parentNode.parentNode;
  parent.parentNode.removeChild(parent);
  reduceTaskNumber(parent);

}

function dateCheck(earlyDate, laterDate){
  var difference = laterDate - earlyDate;
  //console.log(difference);
  var days = difference/(24*3600*1000);
  //console.log(days);
  return days;
}


function adjustGanttBar(duration, bar){
  bar.setAttribute("width", (duration * 10));

}

function addNewGanttBar(rowNum){
  var height = document.getElementById('gantt').rows.length;
  //console.log(height);
  var svg = document.getElementById('svg_area');
  svg.style.height = (height * 50) +'px';


  //console.log("Graph Row " + rowNum);
  var svgNS = "http://www.w3.org/2000/svg";
  var el = document.createElementNS(svgNS, "rect");
  el.setAttributeNS(null, "id", "task" + rowNum);
  el.setAttributeNS(null, "x", 0);
  el.setAttributeNS(null, "y", (35*(rowNum - 1)));
  el.setAttributeNS(null, "height", 40);
  el.setAttributeNS(null, "width", 0);
  document.getElementById('svg_area').appendChild(el);

}

function reduceTaskNumber(row){
  console.log(row);
  var cell = row.childNodes[0].innerHTML;
  console.log(cell);
  var table = document.getElementById("gantt");
  for (var i = cell, row; row = table.rows[i]; i++){
    var lowerCell = row.childNodes[0].innerHTML;
    console.log(lowerCell);
    lowerCell = parseInt(lowerCell) - 1;
    console.log(lowerCell);
    row.childNodes[0].innerHTML = lowerCell;
  }

}


function increaseTaskNumber(task){
  var table = document.getElementById("gantt");
  for (var i = (task+1), row; row = table.rows[i]; i++){
    var lowerCell = row.childNodes[0].innerHTML;
    console.log(lowerCell);
    lowerCell = parseInt(lowerCell) + 1;
    console.log(lowerCell);
    row.childNodes[0].innerHTML = lowerCell;
  }
}
