import { create } from 'zustand';

type QuestState = {
  quests: Quest[];
  selectedQuestId: number;
  selectedQuest: () => Quest | undefined;
  setQuests: (quests: Quest[]) => void;
  addQuest: (quest: Quest) => void;
  updateQuest: (quest: Quest) => void;
  removeQuest: (questId: number) => void;
  selectQuest: (questId: number) => void;
};

export const useQuestStore = create<QuestState>()((set, get) => ({
  quests: [],
  selectedQuestId: 0,
  selectedQuest: () => {
    const state = get();
    return state.quests.find((x) => x.questId === state.selectedQuestId);
  },
  setQuests: (quests) => set(() => ({ quests })),
  addQuest: (quest) => set((state) => ({ quests: [...state.quests, quest] })),
  updateQuest: (quest) =>
    set((state) => ({
      quests: state.quests.map((x) =>
        x.questId === quest.questId ? quest : x,
      ),
    })),
  removeQuest: (questId) =>
    set((state) => ({
      quests: state.quests.filter((x) => x.questId !== questId),
    })),
  selectQuest: (questId) => set(() => ({ selectedQuestId: questId })),
}));
