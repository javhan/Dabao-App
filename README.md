# Dabao

## User Schema
```
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  address: { 
      street : { type : String, required : true},
      postCode : { type : Number, required : true }
  },
  contact : {
      hp : { type : Number, required : true },
      email : { type: String, required: true, unique : true }
  }
  isDabao : { type : String, default : DBee }
});
```
## Match Schema
```
const matchSchema = new mongoose.Schema({
    timePosted : Date
    DBER : { type: Schema.Types.ObjectId, ref: 'User' },
    maxOrders: { type: Number, max : 2 }
    Orders: [
        {
            DBEE : { type: Schema.Types.ObjectId, ref: 'User' },
            isCompleted : Boolean,
            remarks : String,
            dishOrdered : { type: Schema.Types.ObjectId, ref: 'Amenity' },
            messages : [
                {
                    message : String,
                    user : { type: Schema.Types.ObjectId, ref: 'User' }
                }
            ]
        }
    ]
    pickupLocation : { type: Schema.Types.ObjectId, ref: 'User' },
    timeAtPickUp : Date,
    orderLocation : { type: Schema.Types.ObjectId, ref: 'Amenity' }, 
    isCompleted : Boolean
});
```
## Amenity Schema
```
const shopSchema = new mongoose.Schema({
    shop: [
    {
      street : { type : String, required : true},
      postCode : { type : Number, required : true },
      stores: [
        {
          name: { type : String, required : true, unique : true },
          menu: [
            {
              itemName: { type : String, required : true},
              itemPrice: { type : Number, required : true },
            },
          ],
        },
      ],
    },
  ],
});
```
