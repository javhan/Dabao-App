# Dabao

## User Schema
```
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true},
  poscode: { type: String, required: true},
  hp: {type: Number, required: true},

});
```
## Daboa-er Schema
```
const daboa-er = new mongoose.Schema({
    username = { type: Schema.Types.ObjectId, ref: 'User' },
    pickupLocation = {type: Number, required: true }
    dabaoLocation = { type: String, required: true }
    cuisine_dish = { type: String, required: true}
    time = { type: Date, required: true }
    Max-Orders = Number 
})
```
## Daboa-ee Schema
```
const dabao-ee = new mongoose.Schema({
    username = { type: Schema.Types.ObjectId, ref: 'User' },
    currentLocation = Number
    remarks = Array
})
```
## Match Schema
```
const matchSchema = new mongoose.Schema({
    dabao-er-username: { type: ObjectId, ref: 'User' },
    dabao-ee-username: { type: ObjectId, ref: 'User' },
    daboa-details : { type: ObjectId, ref: 'Daboa-er' }
});
```
## Stalls Schema
```
const stallSchema = new mongoose.Schema({
    name: { type: String, required: true } 
    location: { type: String, required: true }
    poscode: { type: Number required: true }
    cuisine : Array
});
```
