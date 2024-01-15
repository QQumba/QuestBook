import { Dispatch, createContext, useContext, useReducer } from 'react';

type QuestDetails = {
  isSelected: boolean;
  quest: Quest | null;
};

type SelectQuest = {
  type: 'select';
  quest: Quest;
};

type DeselectQuest = {
  type: 'deselect';
};

type QuestDetailsActions = SelectQuest | DeselectQuest;

const initialQuestDetails: QuestDetails = {
  isSelected: false,
  quest: null,
};

const QuestDetailsContext = createContext<QuestDetails>(initialQuestDetails);
const QuestDetailsDispatchContext = createContext<
  Dispatch<QuestDetailsActions>
>(() => {});

export default function QuestDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questDetails, dispatch] = useReducer(
    questDetailsReducer,
    initialQuestDetails,
  );

  return (
    <>
      <QuestDetailsContext.Provider value={questDetails}>
        <QuestDetailsDispatchContext.Provider value={dispatch}>
          {children}
        </QuestDetailsDispatchContext.Provider>
      </QuestDetailsContext.Provider>
    </>
  );
}

export function useQuestDetails() {
  return useContext(QuestDetailsContext);
}

export function useQuestDetailsDispatch() {
  return useContext(QuestDetailsDispatchContext);
}

function questDetailsReducer(
  questDetails: QuestDetails,
  action: QuestDetailsActions,
): QuestDetails {
  const type = action.type;

  switch (type) {
    case 'select':
      if (questDetails.quest?.questId === action.quest.questId) {
        return questDetails;
      }
      return {
        isSelected: true,
        quest: action.quest,
      };

    case 'deselect':
      return {
        isSelected: false,
        quest: null,
      };

    default:
      throw Error('Undefined action: ' + type);
  }
}
