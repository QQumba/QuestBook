﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using QuestBook.Data;

#nullable disable

namespace QuestBook.Migrations
{
    [DbContext(typeof(QuestBookDbContext))]
    [Migration("20240117131645_Schedule")]
    partial class Schedule
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("QuestBook.Data.Entities.Quest", b =>
                {
                    b.Property<long>("QuestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("QuestId"));

                    b.Property<bool>("Completed")
                        .HasColumnType("boolean")
                        .HasColumnName("finished");

                    b.Property<DateTime?>("CompletedDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("completed_date_time");

                    b.Property<DateTime>("CreatedDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_date_time");

                    b.Property<long?>("ScheduleId")
                        .HasColumnType("bigint")
                        .HasColumnName("schedule_id");

                    b.Property<long?>("SectionId")
                        .HasColumnType("bigint")
                        .HasColumnName("section_id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("QuestId")
                        .HasName("pk_quest");

                    b.HasIndex("ScheduleId")
                        .HasDatabaseName("ix_quest_schedule_id");

                    b.HasIndex("SectionId")
                        .HasDatabaseName("ix_quest_section_id");

                    b.ToTable("quest", (string)null);
                });

            modelBuilder.Entity("QuestBook.Data.Entities.Schedule", b =>
                {
                    b.Property<long>("ScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("schedule_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ScheduleId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<bool>("Shared")
                        .HasColumnType("boolean")
                        .HasColumnName("shared");

                    b.Property<int>("Type")
                        .HasColumnType("integer")
                        .HasColumnName("type");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("value");

                    b.HasKey("ScheduleId")
                        .HasName("pk_schedule");

                    b.ToTable("schedule", (string)null);
                });

            modelBuilder.Entity("QuestBook.Data.Entities.Section", b =>
                {
                    b.Property<long>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("section_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("SectionId"));

                    b.Property<bool>("IsDefault")
                        .HasColumnType("boolean")
                        .HasColumnName("is_default");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("SectionId")
                        .HasName("pk_section");

                    b.ToTable("section", (string)null);
                });

            modelBuilder.Entity("QuestBook.Data.Entities.Quest", b =>
                {
                    b.HasOne("QuestBook.Data.Entities.Schedule", "Schedule")
                        .WithMany()
                        .HasForeignKey("ScheduleId")
                        .HasConstraintName("fk_quest_schedule_schedule_id");

                    b.HasOne("QuestBook.Data.Entities.Section", "Section")
                        .WithMany("Quests")
                        .HasForeignKey("SectionId")
                        .HasConstraintName("fk_quest_section_section_id");

                    b.Navigation("Schedule");

                    b.Navigation("Section");
                });

            modelBuilder.Entity("QuestBook.Data.Entities.Section", b =>
                {
                    b.Navigation("Quests");
                });
#pragma warning restore 612, 618
        }
    }
}
