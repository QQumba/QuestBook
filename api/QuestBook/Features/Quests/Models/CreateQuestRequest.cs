using QuestBook.Data.Entities;

namespace QuestBook.Features.Quests.Models;

public record CreateQuestRequest(
    string Title,
    long SectionId)
{
    public Quest ToQuest()
    {
        var quest = new Quest
        {
            Title = Title,
            SectionId = SectionId
        };

        return quest;
    }
}