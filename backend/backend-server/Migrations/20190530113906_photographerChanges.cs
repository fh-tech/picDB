﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend_server.Migrations
{
    public partial class photographerChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "Photographer",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Photographer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Photographer");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Photographer");
        }
    }
}
