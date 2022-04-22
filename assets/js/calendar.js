// calendar
const calendar = document.querySelector(".calendar");

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

const isLeapYear = (/** @type {number} */ year) =>
  (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
  (year % 100 === 0 && year % 400 === 0);

const getFebDays = (/** @type {number} */ year) => (isLeapYear(year) ? 29 : 28);

const daysOfMonth = (/** @type {number} */ year) => [
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

/**
 * @typedef {{
 *    year: number,
 *    month: number,
 *    date: number,
 *    message: string,
 *    onclick: () => void
 * }} ImportantDay
 *  */
/** @type {ImportantDay[]} */
const task_days = [
  {
    year: 2022,
    month: 4,
    date: 10,
    message: "whatever",
    onclick: () => console.log("clicked 1")
  },
  {
    year: 2022,
    month: 4,
    date: 15,
    message: "whatever",
    onclick: () => console.log("clicked 2")
  },
  {
    year: 2022,
    month: 4,
    date: 26,
    message: "New Kaaaaj",
    onclick: () => console.log("clicked 3")
  }
];

$(window).on("load", function() {
  $("#preloader").fadeOut();

  var divYear = $("#year"),
    year = new Date().getFullYear().toString();
  if (year != "2021") divYear.text("".concat(year));
  else divYear.text(year);

  /**
   * @param {number} month
   * @param {number} year
   * @param {ImportantDay[]} important_days
   */
  const generateCalendar = (month, year, important_days) => {
    const calendar_days = calendar.querySelector(".calendar-days");
    const calendar_header_year = calendar.querySelector("#year");
    const days_of_month = daysOfMonth(year);

    calendar_days.innerHTML = "";

    const currDate = new Date();
    if (!month) month = currDate.getMonth();
    if (!year) year = currDate.getFullYear();

    const curr_month = `${month_names[month]}`;
    month_picker.innerHTML = curr_month;
    calendar_header_year.innerHTML = year.toString();

    // get first day of month
    const first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      const day = document.createElement("div");
      if (i >= first_day.getDay()) {
        day.innerHTML = /* html */ `
        <a data-toggle="DD">${i - first_day.getDay() + 1}</a>
        <span></span>
        <span></span>
        <span></span>
        <span></span>`;
        if (
          i - first_day.getDay() + 1 === currDate.getDate() &&
          year === currDate.getFullYear() &&
          month === currDate.getMonth()
        )
          day.classList.add("curr-date");
        else
          for (const imp_date of important_days)
            if (
              i - first_day.getDay() + 1 == imp_date.date &&
              year == imp_date.year &&
              month + 1 == imp_date.month
            ) {
              day.classList.add("dropup");
              day.classList.add("imp-date");
              day.innerHTML = day.innerHTML.replace(
                'data-toggle="DD"',
                'data-toggle="dropdown"'
              );
            }

        for (const imp_date of important_days) {
          if (
            i - first_day.getDay() + 1 == imp_date.date &&
            year == imp_date.year &&
            month + 1 == imp_date.month
          ) {
            day.innerHTML += `<p class="dropdown-menu z-index-99 bg-dark text-light p-2 w-25">
                      Tasks<br>${imp_date["message"]}<br>qjhcvuyvebw
                      </p>`;
            day.onclick = imp_date.onclick;
          }
        }
      }
      calendar_days.appendChild(day);
    }
  };

  const month_list = calendar.querySelector(".month-list");

  month_names.forEach((e, index) => {
    const month = document.createElement("div");
    month.innerHTML = `<div data-month="${index}">${e}</div>`;
    month.querySelector("div").onclick = () => {
      if (month_list) month_list.classList.remove("show");
      curr_month.value = index;
      generateCalendar(index, curr_year.value, task_days);
    };
    if (month_list) month_list.appendChild(month);
  });

  /** @type {HTMLDivElement} */
  const month_picker = calendar.querySelector("#month-picker");
  if (month_picker)
    month_picker.onclick = () => month_list && month_list.classList.add("show");

  const currDate = new Date();
  const curr_month = { value: currDate.getMonth() };
  const curr_year = { value: currDate.getFullYear() };

  generateCalendar(curr_month.value, curr_year.value, task_days);

  /** @type {HTMLDivElement} */
  const prevYear = document.querySelector("#prev-year");
  if (prevYear)
    prevYear.onclick = () =>
      generateCalendar(curr_month.value, --curr_year.value, task_days);

  /** @type {HTMLDivElement} */
  const nextYear = document.querySelector("#next-year");
  if (nextYear)
    nextYear.onclick = () =>
      generateCalendar(curr_month.value, ++curr_year.value, task_days);

  // Weeklycalendar
  const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const currMonth = currDate.getMonth();
  let curr_day = currDate.getDay();
  let curr_date = currDate.getDate();

  const newTR = document.createElement("tr");
  newTR.appendChild(document.createElement("th"));
  console.log(curr_month);
  for (let k = 0; k < 7; k++) {
    let newTH = document.createElement("th");
    if (curr_date % daysOfMonth[currMonth] == 0) {
      newTH.appendChild(
        document.createTextNode(
          curr_date.toString() + " - " + days[curr_day % 7]
        )
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
  const weekCalendarTable = document.getElementById("week-calendar-table");
  if (weekCalendarTable) weekCalendarTable.appendChild(newTR);
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
    if (weekCalendarTable) weekCalendarTable.appendChild(newTR);
  }
  // Day calendar
  hour = 1;
  const dayCalendarTable = document.getElementById("day-calendar-table");
  if (dayCalendarTable) dayCalendarTable.appendChild(newTR);
  for (let i = 1; i <= 27; i++) {
    const newTR = document.createElement("tr");
    for (let j = 1; j <= 2; j++) {
      const newTD = document.createElement("td");
      if (i % 3 == 1 && j == 1)
        newTD.appendChild(document.createTextNode((hour++).toString() + " PM"));
      newTR.appendChild(newTD);
    }
    if (dayCalendarTable) dayCalendarTable.appendChild(newTR);
  }

  $(".week-calendar").hide();
  $(".day-calendar").hide();
  $(document).ready(function() {
    $("#selection").change(function() {
      var name = $("#selection").val();
      $(".details").hide();
      $("." + name).show();
    });
  });
  // $("#year").hide();
  // $("#month-picker").hide();
  // FIXME: JANUARY DOESNT WORK
});
