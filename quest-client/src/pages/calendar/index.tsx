import { loadQuests } from '@/api/quest-api';
import { useQuestStore } from '@/stores/quests-store';
import { useEffect } from 'react';

export default function Index() {
  const quests = useQuestStore((state) => state.quests);
  const setQuests = useQuestStore((state) => state.setQuests);

  const currentMonth: Month = {
    name: 'Jan',
    days: getMonth(2024, 0, quests),
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    loadQuests().then((x) => setQuests(x));
  }, []);

  return (
    <div>
      <div className="text-xl">Calendar</div>
      <div className="grid gap-2 grid-cols-7 p-4 border rounded">
        {daysOfWeek.map((x, i) => (
          <div key={i} className="px-2">
            {x}
          </div>
        ))}
        {currentMonth.days.map((day, i) => (
          <div
            className={`border rounded h-20 p-2 ${
              day.fillerDay ? 'bg-slate-100' : ''
            }`}
            key={i}
          >
            <div>{day.date}</div>
            {day.quests.map((quest) => (
              <div key={quest.questId} className="bg-emerald-500">
                {quest.title}
              </div>
            ))}
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
  fillerDay: boolean;
  quests: Quest[];
};

function getMockDays(monthStartWeekday: number) {
  if (monthStartWeekday < 0 || monthStartWeekday > 6) {
    throw Error();
  }

  const days: Day[] = [];

  // previous month
  for (let i = 1; i < monthStartWeekday + 1; i++) {
    days.push({
      date: 31 - monthStartWeekday + i,
      fillerDay: true,
      quests: [],
    });
  }

  for (let i = 1; i <= 31; i++) {
    days.push({ date: i, fillerDay: false, quests: [] });
  }

  // next month
  let leftover = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= leftover; i++) {
    days.push({ date: i, fillerDay: true, quests: [] });
  }

  return days;
}

function getMonth(year: number, month: number, quests: Quest[]): Day[] {
  const start = new Date(year, month, 1);
  const days: Day[] = [];

  // prepend
  const monthStartWeekday = toMonSunWeekDay(start.getDay());
  for (let i = 1; i < monthStartWeekday + 1; i++) {
    days.push({
      date: 31 - monthStartWeekday + i,
      fillerDay: true,
      quests: [],
    });
  }

  const monthEnd = new Date(start);
  monthEnd.setMonth(start.getMonth() + 1);
  const daysInMonth = new Date(
    monthEnd.getFullYear(),
    monthEnd.getMonth(),
    0,
  ).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(start.getFullYear(), start.getMonth(), i);
    const dayQuests = quests.filter(
      (x) =>
        new Date(x.completedDateTime).toDateString() == date.toDateString(),
    );
    days.push({ date: i, fillerDay: false, quests: dayQuests });
  }

  // append
  const leftover = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= leftover; i++) {
    days.push({ date: i, fillerDay: true, quests: [] });
  }

  return days;
}

function toMonSunWeekDay(day: number) {
  // return day;

  if (day < 0 || day > 6) {
    throw Error('Invalid date provided');
  }

  if (day === 0) {
    return 6;
  }

  return day - 1;
}
