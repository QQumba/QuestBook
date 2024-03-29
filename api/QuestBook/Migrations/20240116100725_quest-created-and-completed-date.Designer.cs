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
    [Migration("20240116100725_quest-created-and-completed-date")]
    partial class questcreatedandcompleteddate
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

                    b.Property<long?>("SectionId")
                        .HasColumnType("bigint")
                        .HasColumnName("section_id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("QuestId")
                        .HasName("pk_quest");

                    b.HasIndex("SectionId")
                        .HasDatabaseName("ix_quest_section_id");

                    b.ToTable("quest", (string)null);
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
                    b.HasOne("QuestBook.Data.Entities.Section", "Section")
                        .WithMany("Quests")
                        .HasForeignKey("SectionId")
                        .HasConstraintName("fk_quest_section_section_id");

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
