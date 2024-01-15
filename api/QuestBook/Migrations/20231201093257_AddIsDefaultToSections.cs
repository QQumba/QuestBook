using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuestBook.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDefaultToSections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_default",
                table: "section",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_default",
                table: "section");
        }
    }
}
