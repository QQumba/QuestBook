import * as questApi from '@/api/quest-api';
import { useQuestStore } from '@/stores/quests-store';
import { PlusIcon } from '@heroicons/react/24/solid';
import { stat } from 'fs';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function QuestDetails() {
  const selectedQuest = useQuestStore((state) =>
    state.quests.find((x) => x.questId === state.selectedQuestId),
  );
  const updateQuest = useQuestStore((state) => state.updateQuest);
  const [quest, setQuest] = useState<Quest>();

  const titleRef = useRef<HTMLDivElement>(null);

  const resetQuest = useCallback(() => {
    if (selectedQuest == null) {
      return;
    }

    if (titleRef.current != null) {
      titleRef.current.innerText = selectedQuest!.title;
    }

    setQuest(selectedQuest);
  }, [selectedQuest]);

  useEffect(() => {
    resetQuest();
  }, [resetQuest]);

  async function onTitleBlur() {
    if (quest!.title === '') {
      resetQuest();
      return;
    }
    const updatedQuest = await questApi.updateQuest({
      ...selectedQuest!,
      title: quest!.title,
    });
    if (updatedQuest != null) {
      updateQuest(updatedQuest);
    }
  }

  async function onQuestChanged(quest: Quest) {
    const result = await questApi.updateQuest(quest);
    if (result != null) {
      updateQuest(result);
    }
  }

  const SelectedQuest = () => (
    <div className="space-y-2">
      <div id="quest-title" className="border rounded p-2 bg-white space-y-1">
        <div className="flex w-full">
          <div className="w-4 inline-block text-center flex-shrink-0">
            <input
              type="checkbox"
              checked={selectedQuest!.finished}
              onChange={(e) =>
                onQuestChanged({
                  ...quest!,
                  finished: !selectedQuest!.finished,
                })
              }
            />
          </div>
          <div
            ref={titleRef}
            contentEditable="plaintext-only"
            className="font-semibold break-words outline-none px-1 w-full"
            style={{ maxWidth: 'calc(100% - .5rem)' }}
            onInput={(e) => {
              setQuest({ ...quest!, title: e.currentTarget.textContent ?? '' });
            }}
            onBlur={async () => await onTitleBlur()}
          ></div>
        </div>
        <div className="flex xitems-center text-blue-400 cursor-pointer hover:text-blue-600 transition-colors text-xs">
          <span className="w-4">
            <PlusIcon></PlusIcon>
          </span>
          <span className="px-1">Add step</span>
        </div>
      </div>

      <div className="border rounded p-2 bg-white">Here will be details</div>

      <div className="border rounded p-2 bg-white">
        Here will be other options
      </div>
    </div>
  );

  return (
    <div>
      {selectedQuest != undefined ? (
        SelectedQuest()
      ) : (
        <div className="text-slate-500 text-center">
          Select quest to see details
        </div>
      )}
    </div>
  );
}
