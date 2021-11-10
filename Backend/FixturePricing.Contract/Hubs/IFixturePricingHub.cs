using System.Threading.Tasks;

namespace FixturePricing.Contract.Hubs
{
    public interface IFixturePricingHub
    {
        Task Subscribe();
    }
}