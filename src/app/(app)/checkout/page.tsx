import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { Select } from "@/components/select";

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <Heading>Checkout</Heading>
      
      <form className="mt-8 space-y-6">
        <div className="space-y-4">
            <Heading level={2} className="text-lg">Payment Details</Heading>
             <Field>
              <Label>Card Number</Label>
              <Input name="card_number" placeholder="0000 0000 0000 0000" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
                <Field>
                <Label>Expiry Date</Label>
                <Input name="expiry" placeholder="MM/YY" />
                </Field>
                 <Field>
                <Label>CVC</Label>
                <Input name="cvc" placeholder="123" />
                </Field>
            </div>
            <Field>
                <Label>Cardholder Name</Label>
                <Input name="cardholder" placeholder="John Doe" />
            </Field>
        </div>

        <Button className="w-full">Pay Now</Button>
      </form>
    </div>
  );
}
