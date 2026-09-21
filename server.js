const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: "receipt_order_1",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    // FIXED LINE BELOW: Closed parenthesis after 500
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
