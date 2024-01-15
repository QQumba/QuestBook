import { createQuest } from '@/api/quest-api';
import { useQuestStore } from '@/stores/quests-store';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CreateQuest() {
  const [title, setTitle] = useState<string>('');

  const addQuest = useQuestStore((state) => state.addQuest);

  async function onQuestCreated() {
    if (title === '') {
      return;
    }

    const quest: CreateQuestRequest = { title: title, sectionId: 1 };
    const result = await createQuest(quest);
    if (result == null) {
      return;
    }

    addQuest(result);

    setTitle('');
  }

  return (
    <form className="mb-4 flex space-x-4">
      <input
        className="border rounded flex-1 p-2"
        placeholder="New quest..."
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="p-2 bg-slate-100 rounded-full cursor-pointer transition-colors hover:bg-slate-200"
        onClick={(e) => {
          e.preventDefault();
          onQuestCreated();
        }}
      >
        <PlusIcon className="h-6"></PlusIcon>
      </button>
    </form>
  );
}
