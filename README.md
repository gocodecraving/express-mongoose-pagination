## Introduction
---

Hello Folks,

Pagination of data is highly recommended if you want to fetch large number of records from the collection. For eg: *All users from Users collection.* If you fetch the records without pagination, it may result in slow performance at both back-end and front-end side.

So, this tool will help you to paginate your data without impacting the performance.

You need to use this tool with **find()** query method of **mongoose** ODM to make it work.

You just need to pass the **request** object, and some optional parameters to the **paginate()** method of this tool, it will return an object with useful information that you can use to handle you data with ease.

I have explained it's implementation below:
<br/>

## Dependency Requirements
---
No Dependencies!

<br/>

## Installation
---

*Install with the following command*

>**npm i express-mongoose-pagination**
> or
>**npm install express-mongoose-pagination**

<br/>

## Implementation
---

**1. Import the module in model**

```js
//UserModel.js

const pagination = require('express-mongoose-pagination')

or

//ES6+
import pagination from 'express-mongoose-pagination'
```
<br/>

**2. Apply as plugin to your Schema Instance**

```js
//UserModel.js

const userSchema = new Schema({...})

userSchema.plugin(pagination)

module.exports = mongoose.model('User', userSchema)

or

//ES6+
export default mongoose.model('User', userSchema)
```

<br/>

**3. Somewhere inside your routes block**

```js
//routes.js
const User = require('../models/UserModel.js')

or

import User from '../models/UserModel.js'

//Users route get request
app.get('/users', async function(req, res){

   //1. Use the find query method normally without any restrictions. You can pass all available parameters like condition, projection, options, etc

   const users = await User.find().paginate(req, { withQueryString: true })

   res.render('views/users.html', { users }) //render and pass users

})

```

<br/>

**That's It**

<br/>

## Data Object and Query Parameters
---

You will get the output data in the form of object as mentioned below:

<br/>

```js
//console.log(users)

{
   currentPage: 1// Current page number,
   data: [
      {_id:1, name:'User 1', email: 'user1@test.com'},
      {...},
      {...},
      .
      .
      .
      //upto 15 records

   ] // Array of data objects,
   firstPageUrl: 'https://xyz.com/users?page=1',
   lastPageUrl: 'https://xyz.com/users?page=4',
   from: 1 //paginate serial no from,
   to: 15 //paginate serial no to,
   lastPage: 4 // Last page number,
   nextPageUrl: 'https://xyz.com/users?page=2',
   prevPageUrl: null,
   path: 'https://xyz.com/users',
   perPage: 15 //Per page value,
   total: 60 //Total matched records in users collection
}

//If there is no records you will get same object format with changed values and most of them will be null or empty array for data field.
```

<br/>

**Pre-defined parameters:**
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Usage</th>
<th>Default Value</th>
<th>Is Required</th>
<th>Data Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>page</td>
<td>Navigation between pages</td>
<td>1</td>
<td>No</td>
<td>Int/Number</td>
</tr>
<tr>
<td>perPage</td>
<td>Number of Records per page</td>
<td>15</td>
<td>No</td>
<td>Int/Number</td>
</tr>
</tbody>
</table>

<br/>

**Custom parameters:**

You can pass n number of query parameters with your endpoint and that will reflect in all url specific fields except path field.

***Note: By default custom query string option is disabled, you can enable it by passing withQueryString as a boolean value***

```js
//pass withQueryString option like this

const users = await User.find({ sortIndex: {$gt: 10 } })
                .sort({ sortIndex: 1 })
                .paginate(request, { withQueryString:true })

// Output will be like this
{
   currentPage:1,
   .
   .
   firstPageUrl: 'https://xyz.com/users?page=1&perPage=10&foo=bar&john=doe',
   lastPageUrl: 'https://xyz.com/users?page=4&perPage=10&foo=bar&john=doe',
   .
   .

}                
```

## License
---

[MIT](#https://github.com/codecravegit/express-mongoose-pagination/blob/master/LICENSE.txt)

<br/>

## Show your Support
---

If you like my work, please support and share it to your fellow people.

   * [Star this repository](#https://github.com/codecravegit/express-mongoose-pagination)
   * Share
   * Feel free to fork and experiment, if found any bug or have any suggestion, do let me know.

<br/>

   Thank you and have a great time ahead!