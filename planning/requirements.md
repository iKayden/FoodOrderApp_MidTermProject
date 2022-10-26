Requirements:

- A food ordering experience for a single restaurant
- Select one or more dishes and place an order for pick-up
- They will receive a notification when their order is ready
- The restaurant and client both need to be notified since this app serves as an intermediary
- When an order is placed the restaurant receives the order via SMS

- The restaurant can then specify how long it will take to fulfill it
- Once they provide this information, the website updates for the client and also notifies them via SMS
- You can use a modern telecomm API service such as Twilio to implement SMS communication

GET products

TO DO LIST:
for user page
Front end: when palce an order, server will respond an order id, add this id to cookie

polling to refresh, get order by id through api/order/id
Backend: get order by id

for admin
back: send all order info for admin page
front: accept order=>send to product/:id
backend: update status to confirmed
front: update order from unconfirmed to confirmed

- Start on GET all orders for Admin page:

  1. Displays all orders with order ID, product ID, quantity...
     product name

- Start POST all orders page for Admin page:

  1. Owner can input time (form/button) on wesbite
  2. Button for 'Order is Ready!' then sends SMS to customer

- Start GET ORDER for customers

1. which will send SMS AND update website to customer

- Cookies?!

- Clean up app

THURSDAY AFTERNOON!

- Stretch? Ex. payment option? Admin: edit menu items?
