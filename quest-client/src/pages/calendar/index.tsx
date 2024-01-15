export default function Index() {
  const currentMonth: Month = {
    name: 'Dec',
    days: [
      {
        date: 1,
      },
      {
        date: 2,
      },
      {
        date: 3,
      },
      {
        date: 4,
      },
    ],
  };

  return (
    <div>
      <div className="text-xl">Calendar</div>
      <div className="grid grid-cols-7">
        {currentMonth.days.map((x) => (
          <div className="border w-10 h-10" key={x.date}>
            {x.date}
          </div>
        ))}
      </div>
    </div>
  );
}

type Month = {
  name: string;
  days: Day[];
};

type Day = {
  date: number;
};

function getMonth(month: string, year: number): Day[] {
  const start = new Date(`${month} 1 ${year}`);
  const days: Day[] = [];

  // prepend
  const startDayOfWeek = toMonSunWeekDay(start.getDay());
  for (let i = 0; i < startDayOfWeek; i++) {
       
  }

  // append

  return days;
}

function toMonSunWeekDay(day: number) {
  if (day < 0 || day > 6) {
    throw Error('Invalid date provided');
  }

  if (day === 0) {
    return 6;
  }

  return day - 1;
}
