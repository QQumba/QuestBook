using Microsoft.EntityFrameworkCore;
using QuestBook.Data.Entities;

namespace QuestBook.Data;

public class QuestBookDbContext : DbContext
{
    public QuestBookDbContext(DbContextOptions<QuestBookDbContext> options) : base(options)
    {
    }

    public DbSet<Quest> Quests { get; set; } = null!;

    public DbSet<Section> Sections { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}