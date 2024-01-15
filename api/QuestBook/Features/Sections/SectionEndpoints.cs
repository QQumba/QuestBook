using Microsoft.EntityFrameworkCore;
using QuestBook.Data;
using QuestBook.Features.Sections.Models;
using QuestBook.MinimalApi;

namespace QuestBook.Features.Sections;

public class SectionEndpoints : IEndpointsDefinition
{
    public void MapEndpoints(RouteGroupBuilder builder, string baseUri)
    {
        BaseUri = baseUri;

        builder.MapPost("", CreateSection);
        builder.MapGet("", GetAllSections);
    }

    private static string BaseUri { get; set; } = null!;


    public static async Task<IResult> CreateSection(CreateSectionRequest request, QuestBookDbContext db)
    {
        var section = db.Sections.Add(request.ToSection());
        await db.SaveChangesAsync();

        return Results.Created($"{BaseUri}/section", section.Entity);
    }

    public static async Task<IResult> GetAllSections(QuestBookDbContext db)
    {
        var sections = await db.Sections
            .Include(x => x.Quests.OrderBy(q => q.QuestId))
            .OrderBy(x => x.SectionId)
            .ToListAsync();

        return Results.Ok(sections);
    }
}