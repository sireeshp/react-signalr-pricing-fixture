using System;

namespace FixturePricing.Contract.Dto
{
    public record PriceDto(
        double HomePrice,
        double AwayPrice,
        DateTimeOffset Timestamp);
}