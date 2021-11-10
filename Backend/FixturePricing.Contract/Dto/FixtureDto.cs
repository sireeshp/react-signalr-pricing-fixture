using System;

namespace FixturePricing.Contract.Dto
{
    public record FixtureDto(
        int Id,
        string Name,
        DateTimeOffset KickOff,
        CompetitorDto HomeSide,
        CompetitorDto AwaySide,
        PriceDto CurrentPrices);
}