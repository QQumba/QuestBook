type Quest = {
  questId: number;
  title: string;
  finished: boolean;
};

type CreateQuestRequest = {
  title: string;
  sectionId: number;
};
