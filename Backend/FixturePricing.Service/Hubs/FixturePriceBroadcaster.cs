using System;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;
using System.Threading;
using System.Threading.Tasks;
using FixturePricing.Contract.Dto;
using FixturePricing.Contract.Hubs;
using FixturePricing.Service.Service;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FixturePricing.Service.Hubs
{
    internal class FixturePriceBroadcaster : IHostedService
    {
        private readonly IHubContext<FixturePricingHub, IFixturePricingHubClient> _hubContext;
        private readonly IFixturePriceGenerator _fixturePriceGenerator;
        private readonly ILogger<FixturePriceBroadcaster> _logger;
        private Task<Unit> _publishTask = null;

        public FixturePriceBroadcaster(IHubContext<FixturePricingHub, IFixturePricingHubClient> hubContext, IFixturePriceGenerator fixturePriceGenerator, ILogger<FixturePriceBroadcaster> logger)
        {
            _hubContext = hubContext;
            _fixturePriceGenerator = fixturePriceGenerator;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _publishTask = _fixturePriceGenerator.GetFixtureUpdateObservable()
                .Select(_ => Observable.FromAsync(() => Publish(_)))
                .Concat()
                .Retry()
                .ToTask(cancellationToken);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _publishTask?.Dispose();
            return Task.CompletedTask;
        }

        private async Task Publish(FixtureDto fixtureChange)
        {
            try
            {
                await _hubContext.Clients.All.FixtureInfoUpdated(new FixtureInfoUpdateDto(new[] { fixtureChange }));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed publishing FixtureInfoUpdateDto for Fixture {FixtureId}.", fixtureChange.Id);
            }
        }
    }
}