import Quest from '@/pages/quests/quest';
import { BASE_URL } from '@/url-consts';
import { useEffect, useState } from 'react';
import Accrodion from './accordion';

export default function QuestSection({ section }: { section: Section }) {
  const [quests, setQuests] = useState<Quest[]>(section.quests);

  useEffect(() => {}, []);

  async function updateQuest(quest: Quest) {
    const url = BASE_URL + `quests/${quest.questId}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(quest),
        headers: { 'Content-Type': 'application/json' },
      });
      const updatedQuest: Quest = await response.json();

      setQuests((prev) => {
        const index = prev.findIndex((x) => x.questId === updatedQuest.questId);
        const arr = prev.toSpliced(index, 1, updatedQuest);
        return arr;
      });
    } catch {
      console.log('Error occured while updating quest');
    }
  }

  async function removeQuest(questId: number) {
    const url = BASE_URL + `quests/${questId}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        setQuests((prev) => prev.filter((x) => x.questId !== questId));
      }
    } catch {
      console.log('Error occured while removing quest');
    }
  }

  async function createEmptyQuest() {
    const url = BASE_URL + 'quests';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          title: 'New quest...',
          sectionId: section.sectionId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const createdQuest = await response.json();

      setQuests((prev) => [...prev, createdQuest]);
    } catch {}
  }

  return (
    <Accrodion
      header={() => (
        <div className="flex justify-between">
          <h1 className="text-xl">{section.name}</h1>
          <button
            className="rounded border p-1 hover:bg-slate-200"
            onClick={(event) => {
              event.stopPropagation();
              createEmptyQuest();
            }}
          >
            Create empty
          </button>
        </div>
      )}
    >
      <div className="space-y-2">
        {quests.map((x) => (
          <Quest
            key={x.questId}
            quest={x}
            onQuestChanged={updateQuest}
            onQuestRemoved={removeQuest}
          ></Quest>
        ))}
      </div>
    </Accrodion>
  );
}
