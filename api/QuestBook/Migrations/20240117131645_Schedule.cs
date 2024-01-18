using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QuestBook.Migrations
{
    /// <inheritdoc />
    public partial class Schedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "schedule_id",
                table: "quest",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "schedule",
                columns: table => new
                {
                    schedule_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    type = table.Column<int>(type: "integer", nullable: false),
                    value = table.Column<string>(type: "text", nullable: false),
                    shared = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_schedule", x => x.schedule_id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_quest_schedule_id",
                table: "quest",
                column: "schedule_id");

            migrationBuilder.AddForeignKey(
                name: "fk_quest_schedule_schedule_id",
                table: "quest",
                column: "schedule_id",
                principalTable: "schedule",
                principalColumn: "schedule_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_quest_schedule_schedule_id",
                table: "quest");

            migrationBuilder.DropTable(
                name: "schedule");

            migrationBuilder.DropIndex(
                name: "ix_quest_schedule_id",
                table: "quest");

            migrationBuilder.DropColumn(
                name: "schedule_id",
                table: "quest");
        }
    }
}
