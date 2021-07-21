// get local time/date
var today = moment().format("ddd, MMMM Do h:mm a");

//display local time in jumbotron
$("#currentDay").html(today);

// declare memos variable
var memos = [
  { hour: "8", memo: "" },
  { hour: "9", memo: "" },
  { hour: "10", memo: "" },
  { hour: "11", memo: "" },
  { hour: "12", memo: "" },
  { hour: "13", memo: "" },
  { hour: "14", memo: "" },
  { hour: "15", memo: "" },
  { hour: "16", memo: "" },
  { hour: "17", memo: "" },
];

//waits until document is ready and starts contained functions
$(document).ready(function () {
  //updates time in jumbotron div every 10 seconds and calls function to check/change time slot colors
  function refreshTime() {
    setInterval(function () {
      $("#currentDay").html(moment().format("ddd, MMMM Do h:mm:ss a"));
      timeCheck();
    }, 10000);
  }

  //retrieve/combine data from local storage
  function retrieveMemos() {
    //gets any notes stored in local memory
    var storedMemos = JSON.parse(localStorage.getItem("memos"));
    //if there are locally stored notes, copies them to global variable
    if (storedMemos !== null) {
      memos = storedMemos;
    }
    displayMemos();
  }

  //goes through all time slots and adds memo if found in local storage
  function displayMemos() {
    $(".description").each(function (i) {
      $(this).val(memos[i].memo);
    });
  }

  //compare current hour to hour in schedule and
  // change color based on past, present, future
  function timeCheck() {
    $(".timeBlock").each(function () {
      //get current hour and time slot id
      var now = moment().hour();
      var time = parseInt($(this).attr("id"));

      //compares time slot time to current time and changes time slot color
      if (time < now) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      } else if (time === now) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
      return;
    });
  }

  //listen for click on save icon
  //take text from textarea and save to local file and display
  $(".btn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var memo = $(this).siblings(".description").val();
    //subtracts 8 to align hours with memos index
    memos[hour - 8].memo = memo;
    localStorage.setItem("memos", JSON.stringify(memos));
  });

  retrieveMemos();
  timeCheck();
  refreshTime();
});
