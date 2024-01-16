import { loadQuests } from '@/api/quest-api';
import { useQuestStore } from '@/stores/quests-store';
import { useEffect } from 'react';

export default function Index() {
  // this should be replaced with separate api call
  const quests = useQuestStore((state) => state.quests);
  const setQuests = useQuestStore((state) => state.setQuests);
  const totalCount = quests.length;
  const completedCount = quests.filter((x) => x.completed).length;
  const completedByDate = getCompletedQuestsByDate(
    quests.filter((x) => x.completed),
  );

  useEffect(() => {
    loadQuests().then((x) => setQuests(x));
  }, []);

  return (
    <div>
      <div>total: {totalCount}</div>
      <div>completed: {completedCount}</div>
      {completedByDate.map((x, i) => (
        <div key={i}>
          {x.date}: {x.count}
        </div>
      ))}
    </div>
  );
}

function getCompletedQuestsByDate(quests: Quest[]) {
  const distinctDates: { date: string; count: number }[] = [];
  quests.forEach((x) => {
    const completedDate = new Date(x.completedDateTime).toDateString();
    const index = distinctDates.findIndex((d) => d.date == completedDate);
    if (index == -1) {
      distinctDates.push({ date: completedDate, count: 1 });
    } else {
      distinctDates[index].count++;
    }
  });

  return distinctDates;
}
