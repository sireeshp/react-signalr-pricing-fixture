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

# Improvements
* UI Subscribe to available Fixtures
* Fixture subscribe and Un-subscribe based on ViewPort Width and Hight ( Dynamic Subsciption)
