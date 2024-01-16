using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestBook.Data;
using QuestBook.Features.Quests.Models;
using QuestBook.MinimalApi;

namespace QuestBook.Features.Quests;

public class QuestEndpoints : IEndpointsDefinition
{
    public void MapEndpoints(RouteGroupBuilder builder, string baseUri)
    {
        BaseUri = baseUri;

        builder.MapPost("", CreateQuest);
        builder.MapGet("", GetAllQuests);
        builder.MapPut("{questId:long}", UpdateQuest);
        builder.MapDelete("{questId:long}", DeleteQuest);
    }

    private static string BaseUri { get; set; } = null!;

    public static async Task<IResult> CreateQuest(CreateQuestRequest request, QuestBookDbContext db)
    {
        // Assign arbitrary section
        var section = await db.Sections.FirstAsync();
        var quest = request.ToQuest();
        quest.SectionId = section.SectionId;
        quest.CreatedDateTime = DateTime.UtcNow;

        var createdQuest = db.Quests.Add(quest);
        await db.SaveChangesAsync();

        return Results.Created(BaseUri, createdQuest.Entity);
    }

    public static async Task<IResult> GetAllQuests(QuestBookDbContext db)
    {
        // TODO: add order property and order by it instead of id
        var quests = await db.Quests.OrderBy(x => x.QuestId).ToListAsync();

        return Results.Ok(quests);
    }

    public static async Task<IResult> UpdateQuest(
        [FromRoute] long questId,
        [FromBody] UpdateQuestRequest request,
        QuestBookDbContext db)
    {
        var quest = await db.Quests.FirstOrDefaultAsync(x => x.QuestId == questId);
        if (quest is null)
        {
            return Results.NotFound($"Quest with id {questId} could not be found");
        }

        // TODO: it might be a good idea to move complete/uncomplete logic to a separate endpoint 
        if (!quest.Completed && request.Completed)
        {
            quest.CompletedDateTime = DateTime.UtcNow;
        }

        quest.Title = request.Title;
        quest.Completed = request.Completed;
        
        await db.SaveChangesAsync();
        return Results.Ok(quest);
    }

    public static async Task<IResult> DeleteQuest([FromRoute] long questId, QuestBookDbContext db)
    {
        var quest = await db.Quests.FirstOrDefaultAsync(x => x.QuestId == questId);
        if (quest is null)
        {
            return Results.NotFound($"Quest with id {questId} could not be found");
        }

        db.Quests.Remove(quest);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
}