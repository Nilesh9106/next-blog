---
title: 'Mongo db CRUD commands'
date: 'august 3, 2023'
desc: 'Here are The Simple commands of mongo db '
cover_image: '/images/mongo.jpg'
slug: mongodb-basic-commands
keyword: ['mongo','database']
---
# Mongo Db
## MongoDB main Commands
### to create database
```bash
use db_name
```
### to see all databases
```bash
show dbs
```

### to delete databases
- first select database to delete by use db_name
```bash
db.dropDatabase()
```

### to create collection
```bash
db.createCollection(name,options(optional))
```
- options => capped, autoIndexId, size(if capped true then compulsory), max

### to display all collections
```bash
show collections
```

### to drop collection
```bash
db.collectionName.drop()
```

### to insert document
```bash
db.collection.insert(document)
db.collection.insertOne(document)
db.collection.insertMany(document)
```
#### to insert many documents
```bash
db.collection.insertMany([documents])
```

### Query Documents

- find() it will display all documents
- find(query) it will display matched documents
```bash
db.collection.find()
find().count() total number of documents
find().skip(2) total documents except first 2
find().limit(2) first 2 documents
```

#### limiting fields
- it will display all except date
```bash
db.collection.find({},{date:false}) 
```

#### sort documents
```bash
db.collection.find().sort({price:1}) 
sort by price in ascending order
if {price:-1} then sort by price in descending order
```
#### $or operator
```bash
collection.find({$or:[{id:3},{author:'MDN'}]})
select * from collection where id=3 or author='mdn'
```
#### and operator
- default AND operation is performed

#### $gt/$lt greater then and les then operator
```bash
find({id:{$gt:3}})
select * from collection where id>3
```
#### $in/$nin operator
```bash
find({id:{$in:[1,3,4]}})
find({id:{$nin:[2,5,6]}})
```
### update document using $set
```bash
db.books.updateOne(query, updatedData) to update single document
db.books.updateMany(query, updatedData) to update multiple data
db.books.updateOne({_id:1},{$set:{price:399,title:"nilesh"}})
```
### delete document
```bash
db.books.remove(selectionCriteria,justOne=false)
db.books.deleteOne(criteria)
db.books.deleteMany(criteria)
```