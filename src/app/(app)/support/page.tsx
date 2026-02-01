import { Heading, Subheading } from "@/components/heading";
import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Field, Label } from "@/components/fieldset";
import { Textarea } from "@/components/textarea";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <Heading>Support Center</Heading>
      <Subheading className="mt-2">
        We are here to help. Get immediate support for your issues.
      </Subheading>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Heading level={2} className="text-lg">Contact Us</Heading>
          <Text className="mt-4">
            Fill out the form below and our support team will get back to you within 24 hours.
          </Text>
          <form className="mt-6 space-y-6">
            <Field>
              <Label>Subject</Label>
              <Input name="subject" placeholder="What is your issue about?" />
            </Field>
            <Field>
              <Label>Message</Label>
              <Textarea name="message" rows={4} placeholder="Describe your issue in detail..." />
            </Field>
            <Button type="submit">Submit Ticket</Button>
          </form>
        </div>
        <div>
          <Heading level={2} className="text-lg">Immediate Assistance</Heading>
          <ul className="mt-4 space-y-4">
            <li className="flex flex-col">
              <Text className="font-semibold">Live Chat</Text>
              <Text>Available Mon-Fri, 9am - 5pm EST.</Text>
              <Button outline className="mt-2 w-fit">Start Chat</Button>
            </li>
            <li className="flex flex-col">
               <Text className="font-semibold">Phone Support</Text>
               <Text>+1 (555) 123-4567</Text>
            </li>
            <li className="flex flex-col">
               <Text className="font-semibold">Email</Text>
               <Text>support@saasmarket.com</Text>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
