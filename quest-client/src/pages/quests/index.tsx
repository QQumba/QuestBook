import { useEffect } from 'react';
import Quest from './quest';
import * as questApi from '@/api/quest-api';
import { useQuestStore } from '@/stores/quests-store';
import CreateQuest from './create-quest';

export default function Index() {
  const quests = useQuestStore((state) => state.quests);
  const setQuests = useQuestStore((state) => state.setQuests);
  const updateQuest = useQuestStore((state) => state.updateQuest);
  const removeQuest = useQuestStore((state) => state.removeQuest);

  useEffect(() => {
    loadQuests();
  }, []);

  async function loadQuests() {
    const result = await questApi.loadQuests();
    setQuests(result);
  }

  async function onQuestUpdated(quest: Quest) {
    const result = await questApi.updateQuest(quest);
    if (result != null) {
      updateQuest(result);
    }
  }

  async function onQuestRemoved(questId: number) {
    var success = await questApi.removeQuest(questId);
    if (success) {
      removeQuest(questId);
    }
  }

  return (
    <div className="m-auto max-w-4xl min-h-screen flex flex-col justify-between h-screen">
      <div className="flex py-2 justify-between">
        <h1 className="text-xl ">Quests</h1>
      </div>
      <div className="space-y-2 overflow-y-scroll flex-grow">
        {quests.map((x) => (
          <Quest
            key={x.questId}
            quest={x}
            onQuestChanged={onQuestUpdated}
            onQuestRemoved={onQuestRemoved}
          ></Quest>
        ))}
      </div>
      <CreateQuest></CreateQuest>
    </div>
  );
}
