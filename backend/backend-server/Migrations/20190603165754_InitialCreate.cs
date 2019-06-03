using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Metadata",
                table => new
                {
                    Id = table.Column<int>()
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table => { table.PrimaryKey("PK_Metadata", x => x.Id); });

            migrationBuilder.CreateTable(
                "Photographer",
                table => new
                {
                    Id = table.Column<int>()
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Birthday = table.Column<DateTime>(),
                    Notes = table.Column<string>(nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Photographer", x => x.Id); });

            migrationBuilder.CreateTable(
                "MetaDataEntry",
                table => new
                {
                    MetaDataEntryId = table.Column<int>()
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<int>(),
                    Key = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    MetaDataId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetaDataEntry", x => x.MetaDataEntryId);
                    table.ForeignKey(
                        "FK_MetaDataEntry_Metadata_MetaDataId",
                        x => x.MetaDataId,
                        "Metadata",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                "Pictures",
                table => new
                {
                    PictureId = table.Column<int>()
                        .Annotation("Sqlite:Autoincrement", true),
                    FilePath = table.Column<string>(nullable: true),
                    PhotographerId = table.Column<int>(nullable: true),
                    MetaDataId = table.Column<int>()
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.PictureId);
                    table.ForeignKey(
                        "FK_Pictures_Metadata_MetaDataId",
                        x => x.MetaDataId,
                        "Metadata",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_Pictures_Photographer_PhotographerId",
                        x => x.PhotographerId,
                        "Photographer",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                "Tags",
                table => new
                {
                    Id = table.Column<int>()
                        .Annotation("Sqlite:Autoincrement", true),
                    Value = table.Column<string>(nullable: true),
                    PictureId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        "FK_Tags_Pictures_PictureId",
                        x => x.PictureId,
                        "Pictures",
                        "PictureId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_MetaDataEntry_MetaDataId",
                "MetaDataEntry",
                "MetaDataId");

            migrationBuilder.CreateIndex(
                "IX_Pictures_MetaDataId",
                "Pictures",
                "MetaDataId");

            migrationBuilder.CreateIndex(
                "IX_Pictures_PhotographerId",
                "Pictures",
                "PhotographerId");

            migrationBuilder.CreateIndex(
                "IX_Tags_PictureId",
                "Tags",
                "PictureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "MetaDataEntry");

            migrationBuilder.DropTable(
                "Tags");

            migrationBuilder.DropTable(
                "Pictures");

            migrationBuilder.DropTable(
                "Metadata");

            migrationBuilder.DropTable(
                "Photographer");
        }
    }
}
