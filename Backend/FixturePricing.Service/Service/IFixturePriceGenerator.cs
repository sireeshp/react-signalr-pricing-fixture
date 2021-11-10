using System;
using System.Threading.Tasks;
using FixturePricing.Contract.Dto;

namespace FixturePricing.Service.Service
{
    public interface IFixturePriceGenerator
    {
        FixtureDto[] GetCurrentFixturesSnapshot();
        IObservable<FixtureDto> GetFixtureUpdateObservable();
    }
}