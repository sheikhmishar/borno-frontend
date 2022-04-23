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

const daysOfMonth = (/** @type {number} */ year) => [
  31,
  isLeapYear(year) ? 29 : 28,
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
 *    hour: number,
 *    setClickListener: () => void
 * }} Task
 *  */
/** @type {Task[]} */
const tasks = [
  {
    year: currYear,
    month: currMonth + 1,
    date: currDayOfMonth,
    message: "English",
    hour: 11,
    setClickListener() {
      console.log("clicked", this);
    }
  },
  {
    year: currYear,
    month: currMonth + 1,
    date: currDayOfMonth,
    message: "History",
    hour: 11,
    setClickListener() {
      console.log("clicked", this);
    }
  },
  {
    year: currYear,
    month: currMonth + 1,
    date: currDayOfMonth,
    message: "Math",
    hour: 17,
    setClickListener() {
      console.log("clicked", this);
    }
  },
  {
    year: currYear,
    month: currMonth + 2,
    date: 2,
    message: "Speaking",
    hour: 17,
    setClickListener() {
      console.log("clicked", this);
    }
  },
  {
    year: 2022,
    month: 4,
    date: 15,
    hour: 3,
    message: "study",
    setClickListener: function() {
      console.log("clicked 2", this);
    }
  },
  {
    year: 2022,
    month: 3,
    date: 15,
    hour: 6,
    message: "march",
    setClickListener: () => {
      console.log("clicked 5");
    }
  },
  {
    year: 2022,
    month: 4,
    date: 26,
    hour: 11,
    message: "2022 4 26 11 Task",
    setClickListener: function() {
      console.log("2022 5 5 11 Task", this);
    }
  },
  {
    year: 2022,
    month: 4,
    date: 29,
    hour: 11,
    message: "2022 4 29 11 Task",
    setClickListener: function() {
      console.log("2022 4 29 11 Task", this);
    }
  },
  {
    year: 2022,
    month: 5,
    date: 5,
    hour: 11,
    message: "2022 5 5 11 Task",
    setClickListener: function() {
      console.log("2022 5 5 11 Task", this);
    }
  }
];

$(window).on("load", function() {
  /** @type {HTMLElement} */
  const calendar = document.querySelector(".calendar");

  const monthListElem = calendar.querySelector(".month-list");
  const $monthListElem = $(monthListElem);
  $monthListElem.hide();

  /** @type {HTMLDivElement} */
  const monthPickerElem = calendar.querySelector("#month-picker");
  monthPickerElem.onclick = () => {
    $monthListElem.show();
    $monthListElem.addClass("show");
  };

  /**
   * @param {number?} month
   * @param {number?} year
   * @param {Task[]?} tasks
   */
  const generateCalendar = (month = currMonth, year = currYear, tasks = []) => {
    /** @type {HTMLElement} */
    const calDaysElem = calendar.querySelector(".calendar-days"),
      /** @type {HTMLElement} */
      calYearElem = calendar.querySelector("#cal-year"),
      daysCount = daysOfMonth(year)[month],
      firstDay = new Date(year, month, 1).getDay();

    calDaysElem.innerText = ""; // TODO: clear
    monthPickerElem.innerText = MONTHS[month];
    calYearElem.innerText = year.toString();

    for (let i = 0; i < daysCount + firstDay; i++) {
      const dayDiv = document.createElement("div");
      calDaysElem.appendChild(dayDiv);

      if (i < firstDay) continue;

      const date = i + 1 - firstDay;
      const dropupToggleElem = document.createElement("div");
      dayDiv.appendChild(dropupToggleElem);

      dropupToggleElem.innerText = date.toString();

      if (date === currDayOfMonth && year === currYear && month === currMonth)
        dayDiv.classList.add("curr-date");

      for (const task of tasks)
        if (date == task.date && year == task.year && month == task.month - 1) {
          /** @type {HTMLParagraphElement} */
          let dropupMenuElem;
          if (dayDiv.lastElementChild !== dropupToggleElem) {
            dropupMenuElem =
              /** @type {HTMLParagraphElement} */ (dayDiv.lastElementChild);
          } else {
            dayDiv.classList.add("dropup", "imp-date");
            dropupToggleElem.classList.add(
              "align-items-center",
              "d-flex",
              "h-100",
              "justify-content-center",
              "w-100"
            );
            dropupToggleElem.setAttribute("data-toggle", "dropdown");
            dropupToggleElem.addEventListener("click", task.setClickListener);
            // dropupToggleElem.onclick = task.setClickListener;

            dropupMenuElem = document.createElement("div");
            dayDiv.appendChild(dropupMenuElem);

            dropupMenuElem.innerHTML = /*html*/ `<h5>Tasks</h5><hr class="border-primary"/>`;
            dropupMenuElem.classList.add(
              "dropdown-menu",
              "p-3",
              "border-0",
              "shadow"
            );
          }

          dropupMenuElem.innerHTML += /*html*/ `
            <h6>${task.message} <a href="/" class="text-blue">Class Link</a></h6>
          `;
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
      $monthListElem.removeClass("show");
      $monthListElem.hide();
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
    const thisWeeksTasks = tasks.filter(task => {
      if (
        task.year === currYear &&
        task.month - 1 === currMonth &&
        task.date === currDayOfMonth
      )
        return task;
      if (
        task.year === currYear &&
        task.month - 1 === currMonth &&
        task.date > currDayOfMonth &&
        task.date < currDayOfMonth + 7
      )
        return task;
      if (
        task.year === currYear &&
        task.month - 1 === currMonth + 1 &&
        task.date < (currMonthDayCount + currDayOfMonth + 7) % currMonthDayCount
      )
        return task;
      if (
        task.year === currYear + 1 &&
        task.month - 1 === 0 &&
        task.date < (currMonthDayCount + currDayOfMonth + 7) % currMonthDayCount
      )
        return task;
    });

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

      if (!(date % currMonthDayCount))
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

      const thisWeeksTasksAtThisHour = thisWeeksTasks.filter(
        thisWeeksTask => thisWeeksTask.hour === hour
      );

      for (let iday = 0, date = currDayOfMonth; iday < 7; iday++, date++) {
        dataElem = document.createElement("td");
        rowElem.appendChild(dataElem);

        thisWeeksTasksAtThisHour
          .filter(thisWeeksTask => thisWeeksTask.date === date)
          .forEach(thisHoursTask => {
            const pElem = document.createElement("span");
            dataElem.appendChild(pElem);

            const anchorElem = document.createElement("a");
            dataElem.appendChild(anchorElem);
            dataElem.appendChild(document.createElement("br"));

            pElem.innerText = " " + thisHoursTask.message;
            pElem.onclick = thisHoursTask.setClickListener;
            pElem.style.cursor = "pointer";

            anchorElem.setAttribute("href", "/courses.html");
            anchorElem.classList.add("text-blue");
            anchorElem.innerText = " Class Link";
          });
      }
    }
  }

  const dayCalendarTable = document.getElementById("day-calendar-table");
  const todaysTasks = tasks.filter(
    task =>
      task.date === currDayOfMonth &&
      task.month - 1 === currMonth &&
      task.year == currYear
  );
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

    todaysTasks
      .filter(todaysTask => todaysTask.hour === hour)
      .forEach(thisHoursTask => {
        const pElem = document.createElement("span");
        dataElem.appendChild(pElem);

        const anchorElem = document.createElement("a");
        dataElem.appendChild(anchorElem);
        dataElem.appendChild(document.createElement("br"));

        pElem.innerText = " " + thisHoursTask.message;
        pElem.onclick = thisHoursTask.setClickListener;
        pElem.style.cursor = "pointer";

        anchorElem.setAttribute("href", "/courses.html");
        anchorElem.classList.add("text-blue");
        anchorElem.innerText = " Class Link";
      });
  }

  $(".week-calendar,.day-calendar").hide();
  $("#cal-selection").change(function() {
    var val = $(this).val();
    if (val === "month-calendar") $("#month-picker,.year-picker").show();
    else $("#month-picker,.year-picker").hide();

    $(".details").hide();
    $(String(".").concat(val)).show();
  });
});
