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

    [Column("finished")]
    public bool Completed { get; set; }

    public long? SectionId { get; set; }

    public DateTime CreatedDateTime { get; set; }

    public DateTime? CompletedDateTime { get; set; }

    [JsonIgnore]
    public Section? Section { get; set; }
}