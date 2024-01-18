using System.ComponentModel.DataAnnotations.Schema;

namespace QuestBook.Data.Entities;

[Table("schedule")]
public class Schedule
{
    public long ScheduleId { get; set; }

    public string Name { get; set; } = null!;
    
    public ScheduleType Type { get; set; }

    /// <summary>
    /// String representation of schedule
    /// </summary>
    /// <remarks>
    /// The value is prefixed with version in a special format
    /// <example>
    /// v{version number}:{actual value}
    /// </example>
    /// </remarks>
    public string Value { get; set; } = null!;

    /// <summary>
    /// Allows to share common schedules (daily, work week, weekends)
    /// </summary>
    /// <remarks>
    /// Default value is false
    /// </remarks>
    public bool Shared { get; set; }
}

public enum ScheduleType
{
    Week
}