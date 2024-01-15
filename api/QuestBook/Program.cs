using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using QuestBook.Data;
using QuestBook.Features.Quests;
using QuestBook.Features.Sections;
using QuestBook.MinimalApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureHttpJsonOptions(o =>
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddDbContext<QuestBookDbContext>(o => o
    .UseNpgsql(builder.Configuration.GetConnectionString("Npgsql"))
    .UseSnakeCaseNamingConvention());


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

#pragma warning disable ASP0014
// Ensures the correct order of middleware when used with SPA proxy
app.UseEndpoints(_ => { });
#pragma warning restore ASP0014


if (app.Environment.IsDevelopment())
{
    app.UseSpa(x =>
    {
        var spaConfigSection = app.Configuration.GetSection("SpaDevelopmentServer");
        var spaServer = spaConfigSection["SpaServer"];
        var spaUrl = spaConfigSection[$"Url:{spaServer}"];
        x.UseProxyToSpaDevelopmentServer(spaUrl!);
    });
}

app.MapEndpoints<QuestEndpoints>("quests");
app.MapEndpoints<SectionEndpoints>("sections");

app.Run();