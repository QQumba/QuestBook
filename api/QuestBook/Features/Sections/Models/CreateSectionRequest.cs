using QuestBook.Data.Entities;

namespace QuestBook.Features.Sections.Models;

public record CreateSectionRequest(
    string Name)
{
    public Section ToSection()
    {
        var section = new Section
        {
            SectionId = 0,
            Name = Name
        };

        return section;
    }
}