import { updateQuest } from '@/api/quest-api';
import { Dispatch, createContext, useContext, useReducer } from 'react';

export enum QusetActionType {
  Set = 'set',
  Add = 'add',
  Remove = 'remove',
  Update = 'update',
}

type SetQuests = {
  type: QusetActionType.Set;
  quests: Quest[];
};

type AddQuest = {
  type: QusetActionType.Add;
  quest: Quest;
};

type RemoveQuest = {
  type: QusetActionType.Remove;
  questId: number;
};

type UpdateQuest = {
  type: QusetActionType.Update;
  quest: Quest;
};

export type QuestAction = SetQuests | AddQuest | RemoveQuest | UpdateQuest;

const QuestsContext = createContext<Quest[]>([]);
const QuestsDispatchContext = createContext<Dispatch<QuestAction>>(() => {});

export default function QuestsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quests, dispatch] = useReducer(questsReducer, []);

  return (
    <QuestsContext.Provider value={quests}>
      <QuestsDispatchContext.Provider value={dispatch}>
        {children}
      </QuestsDispatchContext.Provider>
    </QuestsContext.Provider>
  );
}

export function useQuests() {
  return useContext(QuestsContext);
}

export function useQuestsDispatch() {
  return useContext(QuestsDispatchContext);
}

function questsReducer(quests: Quest[], action: QuestAction): Quest[] {
  const type = action.type;
  switch (type) {
    case QusetActionType.Set:
      return action.quests;

    case QusetActionType.Add:
      return [...quests, action.quest];

    case QusetActionType.Remove:
      return quests.filter((x) => x.questId != action.questId);

    case QusetActionType.Update:
      // return handleUpdate(quests, action);
      return quests.map((x) =>
        x.questId === action.quest.questId ? action.quest : x,
      );

    default:
      throw Error('Undefined action: ' + type);
  }
}

function handleUpdate(quests: Quest[], action: UpdateQuest): Quest[] {
  let updatedQuests = quests;

  updateQuest(action.quest).then((q) => {
    if (q == null) {
      return quests;
    }

    updatedQuests = quests.map((x) => (x.questId == q.questId ? q : x));
  });

  return quests;
}
