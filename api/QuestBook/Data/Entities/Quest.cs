using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace QuestBook.Data.Entities;

[Table("quest")]
public class Quest
{
    [Column("id")]
    public long QuestId { get; set; }

    /// <summary>
    /// Title of the quest, required.
    /// </summary>
    public string Title { get; set; } = null!;

    public bool Finished { get; set; }

    public long? SectionId { get; set; }

    [JsonIgnore]
    public Section? Section { get; set; }
}