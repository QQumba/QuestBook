using QuestBook.Data;

namespace QuestBook.Features.Schedule;

public class ScheduleProcessor : IHostedService
{
    private readonly IServiceProvider _serviceProvider;
    
    public ScheduleProcessor(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public Task StartAsync(CancellationToken cancellationToken)
    {
        var context = _serviceProvider.GetRequiredService<QuestBookDbContext>();

        
        
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}