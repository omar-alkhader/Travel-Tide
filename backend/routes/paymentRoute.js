const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe(
  "sk_test_51RKkoXFhaolrH1dJH7Mzz0TZ0RUu4YpqK8DRsjrXCk4vl3iRwq4i8RO3gXBbBT4Ar7YWYe6uiF2p1k8Q6goMXYyL00nS0AhbDb"
); // store in .env

router.post("/", async (req, res) => {
  const { amount } = req.body;

  // Validate the amount
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
