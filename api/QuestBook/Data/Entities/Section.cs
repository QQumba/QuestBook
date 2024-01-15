using System.ComponentModel.DataAnnotations.Schema;

namespace QuestBook.Data.Entities;

[Table("section")]
public class Section
{
    public long SectionId { get; set; }

    public string Name { get; set; } = null!;

    /// <summary>
    /// Describes whether section is default or not.
    /// Default sections should not be displayed to the users.
    /// This is the consequence of decision to make all quests belong to some section.
    /// This potentially should simplify and unify retrieval of quests.   
    /// </summary>
    public bool IsDefault { get; set; }
    
    public ICollection<Quest> Quests { get; set; } = null!;
}