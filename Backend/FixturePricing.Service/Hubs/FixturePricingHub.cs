using System;
using System.Linq;
using System.Threading.Tasks;
using FixturePricing.Contract.Dto;
using FixturePricing.Contract.Hubs;
using FixturePricing.Service.Service;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace FixturePricing.Service.Hubs
{
    internal class FixturePricingHub : Hub<IFixturePricingHubClient>, IFixturePricingHub
    {
        private readonly IFixturePriceGenerator _fixturePriceGenerator;
        private readonly ILogger<FixturePricingHub> _logger;

        public FixturePricingHub(IFixturePriceGenerator fixturePriceGenerator, ILogger<FixturePricingHub> logger)
        {
            _fixturePriceGenerator = fixturePriceGenerator;
            _logger = logger;
        }

        public async Task Subscribe()
        {
            _logger.LogInformation("Received request to subscribe with connectionId:{ConnectionId}",
                Context.ConnectionId);

            var fixtures = _fixturePriceGenerator.GetCurrentFixturesSnapshot();
            if (!fixtures.Any())
                return;

            try
            {
                await Clients.Caller.FixtureInfoUpdated(new FixtureInfoUpdateDto(fixtures));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to publish FixtureInfoUpdateDto to connection {ConnectionId}.", Context.ConnectionId);
            }
        }
    }
}