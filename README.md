# About
* Pricing Subscription service
* UI Subscribes and display Price Tiles as published by Server
* Server side subscriptions can be increased by by changing random generator in
  ```
  Backend/FixturePricing.Service/Service/FixturePriceGenerator.cs
  ```
  Line 32 id

# SignalR Back End generates Random Pricing

> TO Start
```
cd Backend
dotnet run --project ./FixturePricing.Service/FixturePricing.Service.csproj
```

#  React Redux UI

> To Start
```
 cd Frontend
 npm install
 npm start
```
# Changes
* Backend
```
  Backend/FixturePricing.Service/Program.cs
  Backend/FixturePricing.Service/Startup.cs
  Backend/FixturePricing.Service/Service/FixturePriceGenerator.cs
  Backend/FixturePricing.Service/Service/IFixturePriceGenerator.cs
```

* UI
* Simplified Reducer to accept and process dynamic publishing
 ```
  Frontend/src/fixture-overview/reducer.ts 
 ```
 Fixture Tile Extended to show Pricing for Home and Away
 ```
  Frontend/src/fixture-overview/fixture-tile/FixtureTile.tsx
 ```
  
# Improvements
* UI Subscribe to available Fixtures
* Fixture subscribe and Un-subscribe based on ViewPort Width and Hight ( Dynamic Subscription)
* Move Subscribe,Un-subscribe, Message actions to Middleware
