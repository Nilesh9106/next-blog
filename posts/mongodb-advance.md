---
title: 'Mongo db advanced '
date: 'august 3, 2023'
desc: 'Here are The Simple commands of mongo db '
cover_image: '/images/mongo.jpg'
slug: mongodb-advance
keyword: ['mongo','database']
---
# MongoDB 
## indexing
- Indexes are special data structures that store a small portion of the collection’s data set in an easy to traverse form.
```js
db.collection.createIndex({name:1})
```

## Aggregation
- To perform aggregation operations, you can use:
    - Aggregation pipelines, which are the preferred method for performing aggregations.
    - Single purpose aggregation methods, which are simple but lack the capabilities of an aggregation pipeline
    - db.collection.estimatedDocumentCount()
    - db.collection.count()
    - db.collection.distinct(field) : return distinct documents of collection by field

- aggregation
    - $sum 
    - $avg
    - $min 
    - $max
```js
db.orders.aggregate( [

   // Stage 1: Filter pizza order documents by pizza size
   {
      $match: { size: "medium" }
   },

   // Stage 2: Group remaining documents by pizza name and calculate total quantity
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }

] )
```
- The $match stage:
    - Filters the pizza order documents to pizzas with a size of medium.
    - Passes the remaining documents to the $group stage.
- The $group stage:
    - Groups the remaining documents by pizza name.
    - Uses $sum to calculate the total order quantity for each pizza name. The total is stored in the totalQuantity field returned by the aggregation pipeline.

## Replication
- Replication is the process of synchronizing data across multiple servers.
- MongoDB achieves replication by the use of replica set.
    - A replica set is a group of mongod instances that host the same data set.
    - Replica set can have only one primary node in which we execute write operations other node will copy that node.
    - at the time of failure new replica node will elected as primary node.

## Sharding
- Sharding is the process of storing data records across multiple machines and it is MongoDB's approach to meeting the demands of data growth
- There are two methods for addressing system growth
    - Vertical Scaling involves increasing the capacity of a single server, such as using a more powerful CPU, adding more RAM, or increasing the amount of storage space.
    - Horizontal Scaling involves dividing the system dataset and load over multiple servers, adding additional servers to increase capacity as required.
- MongoDB supports horizontal scaling through sharding.
- Single replica set has limitation of 12 nodes