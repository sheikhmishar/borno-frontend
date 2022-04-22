const MONTHS = [
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

const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

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

const currDate = new Date(),
  currMonth = currDate.getMonth(),
  currDayOfMonth = currDate.getDate(),
  currWeekDay = currDate.getDay(),
  currYear = currDate.getFullYear(),
  currMonthDayCount = daysOfMonth(currYear)[currMonth];

/**
 * @typedef {{
 *    year: number,
 *    month: number,
 *    date: number,
 *    message: string,
 *    setClickListener: () => void
 * }} Task
 *  */
/** @type {Task[]} */
const tasks = [
  {
    year: 2022,
    month: 4,
    date: 10,
    message: "whatever",
    // TODO: multiple tasks in one day
    setClickListener() {
      console.log("clicked", this);
    }
  },
  {
    year: 2022,
    month: 4,
    date: 15,
    message: "study",
    setClickListener: function() {
      console.log("clicked 2", this);
    }
  },
  {
    year: 2022,
    month: 3,
    date: 15,
    message: "march",
    setClickListener: () => {
      console.log("clicked 5");
    }
  },
  {
    year: 2022,
    month: 4,
    date: 26,
    message: "New Kaaaaj",
    setClickListener: function() {
      console.log("clicked 3");
    }
  }
];

$(window).on("load", function() {
  /** @type {HTMLElement} */
  const calendar = document.querySelector(".calendar");

  const monthListElem = calendar.querySelector(".month-list");

  /** @type {HTMLDivElement} */
  const monthPickerElem = calendar.querySelector("#month-picker");
  monthPickerElem.onclick = () => monthListElem.classList.add("show");

  /**
   * @param {number} month
   * @param {number} year
   * @param {Task[]} tasks
   */
  const generateCalendar = (month = currMonth, year = currYear, tasks = []) => {
    /** @type {HTMLElement} */
    const calDaysElem = calendar.querySelector(".calendar-days"),
      /** @type {HTMLElement} */
      calYearElem = calendar.querySelector("#cal-year"),
      daysCount = daysOfMonth(year),
      firstDay = new Date(year, month, 1).getDay();

    calDaysElem.innerText = "";
    monthPickerElem.innerText = MONTHS[month];
    calYearElem.innerText = year.toString();

    for (let i = 0; i < daysCount[month] + firstDay; i++) {
      const dayDiv = document.createElement("div");
      calDaysElem.appendChild(dayDiv);

      if (i < firstDay) continue;

      const date = i + 1 - firstDay;
      dayDiv.innerHTML = /*html*/ `<a dd="DD">${date}</a>`;

      if (date === currDayOfMonth && year === currYear && month === currMonth)
        dayDiv.classList.add("curr-date");
      else
        for (const task of tasks)
          if (
            date === task.date &&
            year === task.year &&
            month === task.month - 1
          ) {
            dayDiv.classList.add("dropup");
            dayDiv.classList.add("imp-date");
            dayDiv.innerHTML = dayDiv.innerHTML.replace(
              'dd="DD"',
              'data-toggle="dropdown"'
            );
          }

      for (const task of tasks)
        if (date == task.date && year == task.year && month == task.month - 1) {
          dayDiv.innerHTML += /*html*/ `
            <p class="dropdown-menu p-2">
              Tasks<br/>${task.message}
            </p>
          `;
          dayDiv.onclick = task.setClickListener;
        }
    }
  };

  let pickedMonth = currMonth;
  let pickedYear = currYear;

  MONTHS.forEach((month, index) => {
    const monthElem = document.createElement("div");
    monthListElem.appendChild(monthElem);

    monthElem.innerHTML = /*html*/ `<div data-month="${index}">${month}</div>`;
    monthElem.querySelector("div").onclick = () => {
      monthListElem.classList.remove("show");
      pickedMonth = index;
      generateCalendar(index, pickedYear, tasks);
    };
  });
  generateCalendar(pickedMonth, pickedYear, tasks);

  /** @type {HTMLDivElement} */
  (document.querySelector("#prev-year")).onclick = () =>
    generateCalendar(pickedMonth, --pickedYear, tasks);

  /** @type {HTMLDivElement} */
  (document.querySelector("#next-year")).onclick = () =>
    generateCalendar(pickedMonth, ++pickedYear, tasks);

  const weekCalendarTable = document.getElementById("week-calendar-table");
  if (weekCalendarTable) {
    /** @type {HTMLTableRowElement} */
    let weekDayNameRowElem,
      date = currDayOfMonth,
      day = currWeekDay;

    weekDayNameRowElem = document.createElement("tr");
    weekCalendarTable.appendChild(weekDayNameRowElem);
    weekDayNameRowElem.appendChild(document.createElement("th"));

    for (let i = 0; i < 7; i++, day++, date++) {
      const dayNameHeaderElem = document.createElement("th");
      weekDayNameRowElem.appendChild(dayNameHeaderElem);

      if (date % currMonthDayCount == 0)
        dayNameHeaderElem.innerText = String(date);
      else dayNameHeaderElem.innerText = String(date % currMonthDayCount);
    }

    weekDayNameRowElem = document.createElement("tr");
    weekCalendarTable.appendChild(weekDayNameRowElem);
    weekDayNameRowElem.appendChild(document.createElement("th"));
    date = currDayOfMonth;
    day = currWeekDay;
    for (let i = 0; i < 7; i++, day++, date++) {
      const dayNameHeaderElem = document.createElement("th");
      weekDayNameRowElem.appendChild(dayNameHeaderElem);

      dayNameHeaderElem.innerText = days[day % 7];
    }

    for (let hour = 0; hour < 24; hour++) {
      const rowElem = document.createElement("tr");
      weekCalendarTable.appendChild(rowElem);

      let dataElem = document.createElement("td");
      rowElem.appendChild(dataElem);

      if (hour === 0) dataElem.innerText = "12 AM";
      else if (hour === 12) dataElem.innerText = "12 PM";
      else if (hour < 12) dataElem.innerText = String(hour % 12).concat(" AM");
      else dataElem.innerText = String(hour % 12).concat(" PM");

      for (let weekDay = 0; weekDay < 7; weekDay++) {
        dataElem = document.createElement("td");
        rowElem.appendChild(dataElem);
      }
    }
  }

  const dayCalendarTable = document.getElementById("day-calendar-table");

  for (let hour = 0; dayCalendarTable && hour < 24; hour++) {
    const rowElem = document.createElement("tr");
    dayCalendarTable.appendChild(rowElem);

    /** @type {HTMLTableDataCellElement} */
    let dataElem;

    dataElem = document.createElement("td");
    rowElem.appendChild(dataElem);

    if (hour === 0) dataElem.innerText = "12 AM";
    else if (hour === 12) dataElem.innerText = "12 PM";
    else if (hour < 12) dataElem.innerText = String(hour % 12).concat(" AM");
    else dataElem.innerText = String(hour % 12).concat(" PM");

    dataElem = document.createElement("td");
    rowElem.appendChild(dataElem);
  }

  $(".week-calendar").hide();
  $(".day-calendar").hide();
  $("#selection").change(function() {
    $(".details").hide();
    $(String(".").concat($("#selection").val())).show();
  });
});
