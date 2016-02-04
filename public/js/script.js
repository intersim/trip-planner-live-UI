var daysData = [];
var optionVal,
    dayVal;
var dayNum = 1;
var dayIdx = dayNum -1;

var $day1data = $('#1-btn').data();
daysData.push($day1data);

var getOptionVal = function() {
  optionVal = $(this).prev().val();
  var itinItem = '<div class="itinerary-item"><span class="title">' + optionVal + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button><br></div>';

  if($(this).attr('id') === "hotel-btn") {
    $("#hotel-list").empty().append(itinItem);
    $('.current-day').data('hotel', optionVal);
  } 
  if($(this).attr('id') === "rest-btn") {
    $("#rest-list").append(itinItem);
    $('.current-day').data('rest', optionVal);
  }
  if($(this).attr('id') === "activity-btn") {
    $("#activity-list").append(itinItem);
    $('.current-day').data('act', optionVal);
  }

}

var removeBtn = function () {
  var dataType;
  console.log("clicked remove!");

  if ($(this).parent().parent().attr('id') === "hotel-list") {
    dataType = "hotel";
  }

  if ($(this).parent().parent().attr('id') === "rest-list") {
    dataType = "rest";
  }

  if ($(this).parent().parent().attr('id') === "activity-list") {
    dataType = "act";
  }

  $('.current-day').removeData(dataType);
  $(this).parent().empty();
}

var addDay = function () {
  dayNum++; 
  var dayEl = '<button id="' + dayNum + '-btn" class="btn btn-circle day-btn num-btn" data-day-num="' + dayNum + '">' + dayNum + '</button>';
  $(this).before(dayEl);
  var thisId = '#' + dayNum + '-btn';
  daysData.push($(thisId).data());
}

var switchDay = function () {
  dayVal = $(this).text();
  $('.current-day').removeClass('current-day');
  $(this).addClass('current-day');
  $('#day-text').text('Day ' + dayVal);
}

$('.btn-submit').on('click', getOptionVal);
$('#user-itin').on('click', '.remove', removeBtn);
$('.day-buttons').on('click', '.num-btn', switchDay);
$('#add-day').on('click', addDay);


