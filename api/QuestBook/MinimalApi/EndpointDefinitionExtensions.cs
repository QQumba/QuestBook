namespace QuestBook.MinimalApi;

public static class EndpointDefinitionExtensions
{
    public static IEndpointRouteBuilder MapEndpoints<T>(this IEndpointRouteBuilder routeBuilder, string baseUri)
        where T : IEndpointsDefinition, new()
    {
        var t = new T();
        var swaggerGroup = Capitalize(baseUri);
        var builder = routeBuilder.MapGroup($"api/{baseUri}").WithTags(swaggerGroup);
        t.MapEndpoints(builder, baseUri);

        return routeBuilder;
    }

    private static string Capitalize(string text)
    {
        if (text.Length == 1)
        {
            return text.ToUpper();
        }

        return text[..1].ToUpper() + text[1..];
    }
}