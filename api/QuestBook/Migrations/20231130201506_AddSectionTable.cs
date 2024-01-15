using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QuestBook.Migrations
{
    /// <inheritdoc />
    public partial class AddSectionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "section_id",
                table: "quest",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "section",
                columns: table => new
                {
                    section_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_section", x => x.section_id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_quest_section_id",
                table: "quest",
                column: "section_id");

            migrationBuilder.AddForeignKey(
                name: "fk_quest_section_section_id",
                table: "quest",
                column: "section_id",
                principalTable: "section",
                principalColumn: "section_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_quest_section_section_id",
                table: "quest");

            migrationBuilder.DropTable(
                name: "section");

            migrationBuilder.DropIndex(
                name: "ix_quest_section_id",
                table: "quest");

            migrationBuilder.DropColumn(
                name: "section_id",
                table: "quest");
        }
    }
}
