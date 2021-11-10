using System.Threading.Tasks;
using FixturePricing.Contract.Dto;

namespace FixturePricing.Contract.Hubs
{
    public interface IFixturePricingHubClient
    {
        Task FixtureInfoUpdated(FixtureInfoUpdateDto fixtureInfoUpdate);
    }
}