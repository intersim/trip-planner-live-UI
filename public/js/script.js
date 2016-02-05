var optionVal,
    dayVal,
    dayIdx;

var daysDataArr = [ { 
  dayNum: 1,
  hotel: undefined,
  rest: [],
  act: []
 } ];

var dayNum = 1;

var getOptionVal = function() {

  var thisDayNum = $('.current-day').data('dayNum');
  dayIdx = thisDayNum - 1;

  optionVal = $(this).prev().val();
  var itinItem = '<div class="itinerary-item"><span class="title">' + optionVal + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button><br></div>';

  if($(this).attr('id') === "hotel-btn") {
    $("#hotel-list").empty().append(itinItem);
    // $('.current-day').data('hotel', optionVal);
    daysDataArr[dayIdx].hotel = optionVal;
  } 
  if($(this).attr('id') === "rest-btn") {
    $("#rest-list").append(itinItem);
    daysDataArr[dayIdx].rest.push(optionVal);
  }
  if($(this).attr('id') === "activity-btn") {
    $("#activity-list").append(itinItem);
    daysDataArr[dayIdx].act.push(optionVal);
  }

}

var removeBtn = function () {
  var thisDayNum = $('.current-day').data('dayNum');
  dayIdx = thisDayNum - 1;

  if ($(this).parent().parent().attr('id') === "hotel-list") {
    daysDataArr[dayIdx].hotel = undefined;
  }

  if ($(this).parent().parent().attr('id') === "rest-list") {
    var removeVal = $(this).prev().text();
    var valIdx = daysDataArr[dayIdx].rest.indexOf(removeVal);
    daysDataArr[dayIdx].rest.splice(valIdx, 1);
  }

  if ($(this).parent().parent().attr('id') === "activity-list") {
    var removeVal = $(this).prev().text();
    var valIdx = daysDataArr[dayIdx].act.indexOf(removeVal);
    daysDataArr[dayIdx].act.splice(valIdx, 1);
  }

  $(this).parent().empty();
}

var addDay = function () {
  console.log("added a day!");

  dayNum++;
  
  var dayEl = '<button id="' + dayNum + '-btn" class="btn btn-circle day-btn num-btn" data-day-num="' + dayNum + '">' + dayNum + '</button>';
  $(this).before(dayEl);
  
  var dayData = { 
    dayNum: undefined,
    hotel: undefined,
    rest: [],
    act: []
  };

  dayData.dayNum = dayNum;
  var thisId = '#' + dayNum + '-btn';
  daysDataArr.push(dayData);
}

var dataToHTML = function (dataToInsert) {
  itinItem = '<div class="itinerary-item"><span class="title">' + dataToInsert + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button><br></div>';

  return itinItem;
}

var switchDay = function () {
  console.log("switched to a new day!");
  console.log(this);

  //clear the old itin
  $('.itinerary-item').detach();

  //get the day number, add new header, make it current day
  dayVal = $(this).text();
  dayIdx = dayVal-1;
  $('.current-day').removeClass('current-day');
  $(this).addClass('current-day');
  $('#day-text').text('Day ' + dayVal);

  //get the day's data object from array
  //load data onto DOM
  // var insertDataHere;
  // var itinItem;

  if (daysDataArr[dayIdx].hotel) {
    $('#hotel-list').append(dataToHTML(daysDataArr[dayIdx].hotel));
  }

  if (daysDataArr[dayIdx].rest.length > 0) {
    $.each(daysDataArr[dayIdx].rest, function (i, oneRest) {
      $('#rest-list').append(dataToHTML(oneRest));
    });
  }

  if (daysDataArr[dayIdx].act.length > 0) {
    $.each(daysDataArr[dayIdx].act, function (i, oneAct) {
      $('#activity-list').append(dataToHTML(oneAct));
    });
  }
}

var removeDay = function () {
  var thisDayNum = $('.current-day').data('dayNum');
  dayIdx = thisDayNum - 1;

  daysDataArr.splice(dayIdx, 1);

  var thisDayId = "#" + thisDayNum + "-btn";

  //change header to prev day
  //get rid of num button?
  //reset numbers of other buttons
  //clear itin
  //load itin with prev day's data?
  
  //last day:
  switchDay.call($('.current-day').prev());
  $(thisDayId).remove();

  // if (thisDayNum === daysDataArr.length) {
    

  // }

  //some middle day:

  //first day:

}

$('.btn-submit').on('click', getOptionVal);
$('#user-itin').on('click', '.remove', removeBtn);
$('.day-buttons').on('click', '.num-btn', switchDay);
$('#add-day').on('click', addDay);
$('#day-rm-btn').on('click', removeDay);



