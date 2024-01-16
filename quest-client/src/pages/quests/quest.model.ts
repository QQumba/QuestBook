type Quest = {
  questId: number;
  title: string;
  completed: boolean;
  completedDateTime: Date;
  createdDateTime: Date;
};

type CreateQuestRequest = {
  title: string;
  sectionId: number;
};
