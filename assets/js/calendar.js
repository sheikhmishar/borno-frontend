$(window).on("load", function() {
  $("#preloader").fadeOut();

  var divYear = $("#year"),
    year = new Date().getFullYear().toString();
  if (year != "2021") divYear.text("".concat(year));
  else divYear.text(year);
});

// Calender
let calendar = document.querySelector(".calendar");

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
isLeapYear = year => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = year => {
  return isLeapYear(year) ? 29 : 28;
};

generateCalendar = (month, year, important_days) => {
  let calendar_days = calendar.querySelector(".calendar-days");
  let calendar_header_year = calendar.querySelector("#year");

  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  calendar_days.innerHTML = "";

  let currDate = new Date();
  if (!month) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  let curr_month = `${month_names[month]}`;
  month_picker.innerHTML = curr_month;
  calendar_header_year.innerHTML = year;

  // get first day of month

  let first_day = new Date(year, month, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");
    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.classList.add("dropup");
      day.innerHTML = `<a href="#" data-toggle="dropdown" class="z-index-0">${i -
        first_day.getDay() +
        1}`;
      day.innerHTML += `</a>`;
      day.innerHTML += `<span></span>
							  <span></span>
							  <span></span>
							  <span></span>`;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      } else {
        for (var imp_date of important_days) {
          if (
            i - first_day.getDay() + 1 == imp_date["date"] &&
            year == imp_date["year"] &&
            month + 1 == imp_date["month"]
          ) {
            day.classList.add("imp-date");
          }
        }
      }
      for (var imp_date of important_days) {
        if (
          i - first_day.getDay() + 1 == imp_date["date"] &&
          year == imp_date["year"] &&
          month + 1 == imp_date["month"]
        ) {
          day.innerHTML += `<p class="dropdown-menu z-index-99 bg-dark text-light p-2 w-25">
                      Tasks<br>${imp_date["message"]}<br>qjhcvuyvebw
                      </p>`;
        }
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.querySelector("div").onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(index, curr_year.value);
  };
  month_list.appendChild(month);
});

let month_picker = calendar.querySelector("#month-picker");

month_picker.onclick = () => {
  month_list.classList.add("show");
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

let task_days = [
  { year: 2022, month: 4, date: 10, message: "whatever" },
  { year: 2022, month: 4, date: 15, message: "whatever" },
  { year: 2022, month: 4, date: 26, message: "New Kaaaaj" }
];

generateCalendar(curr_month.value, 2022, task_days);

// WeeklyCalender
days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let daysOfMonth = [
  31,
  getFebDays(year),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();
let curr_day = currDate.getDay();
let curr_date = currDate.getDate();
document
  .getElementById("full-date")
  .appendChild(
    document.createTextNode(month_names[currMonth] + " " + curr_date)
  );
let newTR = document.createElement("tr");
newTR.appendChild(document.createElement("th"));
console.log(curr_month);
for (let k = 0; k < 7; k++) {
  let newTH = document.createElement("th");
  if (curr_date % daysOfMonth[currMonth] == 0) {
    newTH.appendChild(
      document.createTextNode(curr_date.toString() + " - " + days[curr_day % 7])
    );
  } else {
    newTH.appendChild(
      document.createTextNode(
        (curr_date % daysOfMonth[currMonth]).toString() +
          " - " +
          days[curr_day % 7]
      )
    );
  }
  newTR.appendChild(newTH);
  curr_date++;
  curr_day++;
}
document.getElementById("week-calender-table").appendChild(newTR);
console.log(curr_date);
console.log(curr_day);
let hour = 1;
for (let i = 1; i <= 27; i++) {
  let newTR = document.createElement("tr");
  for (let j = 1; j <= 8; j++) {
    let newTD = document.createElement("td");
    if (i % 3 == 1 && j == 1) {
      newTD.appendChild(document.createTextNode(hour.toString() + " PM"));
      hour++;
    }
    newTR.appendChild(newTD);
  }
  document.getElementById("week-calender-table").appendChild(newTR);
}
// Day Calender
hour = 1;
for (let i = 1; i <= 27; i++) {
  let newTR = document.createElement("tr");
  for (let j = 1; j <= 2; j++) {
    let newTD = document.createElement("td");
    if (i % 3 == 1 && j == 1) {
      newTD.appendChild(document.createTextNode(hour.toString() + " PM"));
      hour++;
    }
    newTR.appendChild(newTD);
  }
  document.getElementById("day-calender-table").appendChild(newTR);
}

$(".week-calender").hide();
$(".day-calender").hide();
$(document).ready(function() {
  $("#selection").change(function() {
    var name = $("#selection").val();
    $(".details").hide();
    $("." + name).show();
  });
});
$("#year").hide();
$("#month-picker").hide();
