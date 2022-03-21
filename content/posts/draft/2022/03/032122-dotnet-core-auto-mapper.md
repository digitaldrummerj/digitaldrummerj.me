---
categories: ["aspnet core"]
date: 2022-03-21T13:00:00Z
draft: true
title: "ASP.NET Core - Easy Mapping One Object to Another"
url: '/aspnet-core-automapper'
---

Mapping code is boring. 

Testing mapping code is even more boring. 

AutoMapper is a simple little library built map one object to another and takes out all of the fuss of mapping one object to another.

<!--more-->

## What is AutoMapper?

AutoMapper is an object-object mapper. Object-object mapping works by transforming an input object of one type into an output object of a different type. 

What makes AutoMapper interesting is that it provides conventions to take the work out of figuring out how to map type A to type B. As long as type B follows AutoMapper’s established convention, almost zero configuration is needed to map two types.

## Why use AutoMapper?

Mapping code is boring. 

Testing mapping code is even more boring. 

AutoMapper provides simple configuration of types, as well as simple testing of mappings. 

The real question may be "why use object-object mapping?" 

Mapping can occur in many places in an application, but mostly in the boundaries between layers, such as between the UI/Domain layers, or Service/Domain layers. 

## How do I use AutoMapper?

First, you need both a source and destination type to work with. The destination type’s design can be influenced by the layer in which it lives, but AutoMapper works best as long as the names of the members match up to the source type’s members. If you have a source member called "FirstName", this will automatically be mapped to a destination member with the name "FirstName".

Once you have your types created you create a map for the two types using a MapperConfiguration and CreateMap. You only need one MapperConfiguration instance typically per AppDomain and should be instantiated during startup.

```csharp
var config = new MapperConfiguration(cfg => cfg.CreateMap<Order, OrderDto>());
```

The type on the left is the source type, and the type on the right is the destination type. To perform a mapping, call one of the Map overloads:

```csharp
var mapper = config.CreateMapper();
// or
var mapper = new Mapper(config);
OrderDto dto = mapper.Map<OrderDto>(order);
```

Most applications can use dependency injection to inject the created IMapper instance.

## Where do I configure AutoMapper?

Configuration should only happen once per AppDomain. That means the best place to put the configuration code is in application startup.

For ASP.NET Core the Dependency Injection article shows how to configure AutoMapper in your application.