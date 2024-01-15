namespace QuestBook.MinimalApi;

public interface IEndpointsDefinition
{
    void MapEndpoints(RouteGroupBuilder builder, string baseUri);
}