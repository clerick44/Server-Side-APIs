// get local time/date
var today = moment().format("ddd, MMMM Do h:mm:ss a");
var now = moment().hour();
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

$(document).ready(function () {
  function refreshTime() {
    setInterval(function () {
      $("#currentDay").html(moment().format("ddd, MMMM Do h:mm:ss a"));
      console.log("a");
      timeCheck();
    }, 1000);
  }

  //retrieve/combine data from local storage
  function retrieveMemos() {
    var storedMemos = JSON.parse(localStorage.getItem("memos"));
    if (storedMemos !== null) {
      memos = storedMemos;
    }
    displayMemos();
  }

  function displayMemos() {
    $(".description").each(function (i) {
      $(this).val(memos[i].memo);
    });
  }

  //compare current hour to hour in schedule and
  // change color based on past, present, future
  function timeCheck() {
    $(".timeBlock").each(function (i) {
      var time = parseInt($(this).attr("id"));
      console.log(now);
      console.log(time);
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
    });
  }

  //listen for click on save icon
  //take text from textarea and save to local file and display
  $(".btn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var memo = $(this).siblings(".description").val();
    memos[hour - 8].memo = memo;
    localStorage.setItem("memos", JSON.stringify(memos));
  });

  retrieveMemos();
  //   timeCheck();
  refreshTime();
});
