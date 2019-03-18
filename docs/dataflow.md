# Front Office Data Flow
## Data Model Front Office and example objects
Each object shows an example of the structure of these data types in the *front office* server.
Each object implies a "table" or "collection" that is stored in the database of the *front office* server.

```js
Bar: {
  barId: 'a76jg9', // ID needs to be 6 digit base62, generated at creation time, so overwrite mongo default ID!
  name: 'Penderels Oak',
  address: '283-288 High Holborn, Holborn, London WC1V 7HP, UK',
  URLs: {
    Customer: 'https://barq.app/a76jg9',
    Staff: 'https://barq.app/a76jg9/staff',
  },
  currency: 'GBP',
  menu: Menu,
  queue: [Order],
  history: [Order],
  staff: [Employee],
  owner: Employee, // uuid of admin
  open: false,
}

Menu: {
  menuId: '{uuid}',
  categories: [Category],
}

Category: {
  name: 'Bottled beers',
  items: [Item],
}

Item: {
  name: 'Corona',
  price: 3.60,
  currency: 'EUR (€)', // needs to be in the format that stripe accepts!! stripe needs to know the currency
  ...userDefinedFields
}

Order: {
  orderId: 359,
  items: [Item],
  status: '{paid|in preparation|ready for pickup|completed|failed|cancelled}', // only last 3 in history
}

Employee: {
  staffId: '{uuid}',
  email: 'tom.cheers@gmail.com',
  role: 'admin', // admin or staff
}
```

## Event model FO
### Namespace: {Counter_id} // Room: {temp_customer_id} (room is unique for customer)
#### FO Server
Establish connection:

```js
Listen: connectEvent with {type: 'customer'}
EmitAcknowledge: connectConfirmEvent with {room: _id}
```

Confirm an item:

```js
Listen: confirmOrderEvent with {order: Order}
```

Pay an item:

```js
// question mark here --> how stripe works
```

Update order status:

```js
Emit: updateOrderStatusEvent with {order: Order}
```

Update bar status:

```js
Emit: updateBarStatusEvent with {open: false/true}
```

#### Customer client
Establish connection:

```js
Emit: connectEvent with {type: customer}
Listen: connectionConfirmEvent with {temp_customer_id: '{uuid}', menu: Menu, open: true}
```

Confirm an item:

```js
Emit: confirmOrderEvent with {order: Order}
```

Pay an item:

```js
// question mark here --> how stripe works
```

Update order status:

```js
Listen: updateOrderStatusEvent with {order: Order}
```

Update bar status:

```js
Listen: updateCounterStatusEvent with {open: false/true}
```

### Namespace: {Counter_id} // Room: {staff_id} (room is unique for staff member)
#### FO Server
Establish connection:

```js
Listen: connectEvent with {type: 'staff'}
EmitAcknowledge: connectConfirmEvent with {room: '{staff_id}', queue: [Order], history: [Order], open: false}
```

Update the queue status:

```js
Emit: updateQueueEvent with {queue: [Order]}
```

Update the order status:

```js
Emit: updateOrderStatusEvent with {order: Order}
```

Toggle Counter Open Status:

```js
Emit: updateCounterStatusEvent with {open: false/true}
```

#### Staff client
Establish connection:

```js
Emit: connectEvent with {type: 'staff'}
Listen: connectConfirmEvent with {room: '{staff_id}', queue: [Order], history: [Order], open: false}
```

Update the queue status:

```js
Listen: updateQueueEvent with {queue: [Order]}
```

Update the order status:

```js
Listen: updateOrderStatusEvent with {order: Order}
```

Toggle Counter Open Status:

```js
Listen: updateCounterStatusEvent with {open: false/true}
```

