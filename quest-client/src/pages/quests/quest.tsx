import {
  useQuestDetails,
  useQuestDetailsDispatch,
} from '@/components/providers/quest-details-provider';
import { useQuestStore } from '@/stores/quests-store';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Quest({
  quest,
  onQuestChanged,
  onQuestRemoved,
}: {
  quest: Quest;
  onQuestChanged: (quest: Quest) => void;
  onQuestRemoved: (questId: number) => void;
}) {
  const [title, setTitle] = useState(quest.title);
  const [edit, setEdit] = useState(false);
  const questDetails = useQuestDetails();
  const questDetailsDispatch = useQuestDetailsDispatch();
  const selectQuest = useQuestStore((state) => state.selectQuest);

  const lineThrough = !edit && quest.completed;
  // const selected = questDetails?.quest?.questId == quest.questId;
  const selected = useQuestStore(state => state.selectedQuestId === quest.questId);

  function toggleCompleted() {
    quest.completed = !quest.completed;
    onQuestChanged(quest);
  }

  function onQuestSelected() {
    selectQuest(quest.questId);
  }

  return (
    <div
      className={`flex rounded border p-2 space-x-4 items-center cursor-pointer transition-colors ${
        selected ? 'bg-blue-100' : 'bg-slate-50'
      }`}
      onClick={onQuestSelected}
    >
      <span>
        <input
          className=" outline-slate-300 cursor-pointer"
          type="checkbox"
          checked={quest.completed}
          onChange={toggleCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </span>
      <span className="flex-1">
        {quest.title}
        {/* <input
          className={`w-full bg-inherit outline-slate-300 ${
            lineThrough ? `line-through` : ''
          }`}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onFocus={() => setEdit(true)}
          onBlur={() => {
            setEdit(false);
            if (quest.title === title) {
              return;
            }
            quest.title = title;
            onQuestChanged(quest);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter' || event.key === 'Escape') {
              event.preventDefault();
              (event.target as any).blur();
            }
          }}
        /> */}
      </span>
      <button className="cursor-pointer rounded-full p-1 hover:bg-slate-200 transition-colors outline-slate-300">
        <TrashIcon
          className="h-5 w-5 text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onQuestRemoved(quest.questId);
          }}
        ></TrashIcon>
      </button>
    </div>
  );
}
