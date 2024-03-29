﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuestBook.Migrations
{
    /// <inheritdoc />
    public partial class questcreatedandcompleteddate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "completed_date_time",
                table: "quest",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_date_time",
                table: "quest",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "completed_date_time",
                table: "quest");

            migrationBuilder.DropColumn(
                name: "created_date_time",
                table: "quest");
        }
    }
}
