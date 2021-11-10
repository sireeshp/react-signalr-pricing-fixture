using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading;
using FixturePricing.Contract.Dto;

namespace FixturePricing.Service.Service
{
    public class FixturePriceGenerator : IFixturePriceGenerator
    {
        private readonly IList<FixtureDto> _fixtures = new List<FixtureDto>();
        private readonly TimeSpan _updateInterval = TimeSpan.FromMilliseconds(250);
        private readonly Random _random = new Random();
        private readonly IObservable<FixtureDto> _observableCollection;
        private readonly Subject<FixtureDto> _subject;

        public FixturePriceGenerator()
        {
            _subject = new Subject<FixtureDto>();
            _observableCollection = _fixtures.ToObservable().Concat(_subject);
            var timer = new Timer(UpdateFixture, null, _updateInterval, _updateInterval);
        }
        FixtureDto[] IFixturePriceGenerator.GetCurrentFixturesSnapshot()
        {
            return _fixtures.ToArray();
        }
        private void UpdateFixture(object state)
        {
            int id = _random.Next(0, 10);
            int homeMultiplyer = _random.Next(0, 10);
            int awayMultiplyer = _random.Next(0, 10);
            var dto = new FixtureDto(id, "M_" + id, DateTimeOffset.Now,
             new CompetitorDto(id, "C_H_" + id),
             new CompetitorDto(id, "C_A_" + id),
             new PriceDto(id * homeMultiplyer, id * awayMultiplyer, DateTimeOffset.Now));
            _subject.OnNext(dto);
        }
        public IObservable<FixtureDto> GetFixtureUpdateObservable()
        {
            return _observableCollection;
        }
    }
}