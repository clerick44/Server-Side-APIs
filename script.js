// get local time/date
var today = moment().format("ddd, MMMM Do");

//display local time in jumbotron
$("#currentDay").html(today);

// declare memos variable and retrieve/combine data from local storage
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
];

function retrieveMemos() {
  var storedMemos = JSON.parse(localStorage.getItem("memos"));
  if (storedMemos !== null) {
    memos = storedMemos;
  }
}

//listen for click on save icon
//take text from textarea and save to local file and display
$(".btn").on("click", function () {
  var hour = $(this).parent().attr("id");
  var memo = $(this).siblings(".description").val();
  memos[hour - 8].memo = memo;
  localStorage.setItem("memos", JSON.stringify(memos));
});

//compare current hour to hour in schedule and
// change color based on past, present, future
$(".timeBlock");
