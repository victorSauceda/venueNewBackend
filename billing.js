const stripePackage = require("stripe");
// import { calculateCost } from "./libs/billing-lib";
const { success, failure } = require("./libs/response-lib");

export async function main(event, context) {
  const { storage, source } = JSON.parse(event.body);
  console.log("event:", event.body, "source: ", source);
  const total = JSON.parse(event.body);
  const amount = total.amount * 100;
  console.log("amount:", amount);
  console.log("source: ", source);
  const description = "Venue charge charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage("sk_test_pLeLwpLLX7IGrqg8Uqs997Rm00senAhVat");

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }
}
