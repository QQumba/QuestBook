namespace QuestBook.Features.Quests.Models;

public record UpdateQuestRequest(
    string Title,
    bool Finished
);