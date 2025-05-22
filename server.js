const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_SECRET_KEY');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: req.body.name,
        },
        unit_amount: req.body.amount,
      },
      quantity: 1,
    }],
    success_url: 'https://yourdomain.com/success', //url for success page
    cancel_url: 'https://yourdomain.com/cancel',  //url for cancel page
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Server running on port 4242'));