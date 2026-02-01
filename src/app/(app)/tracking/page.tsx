import { Heading, Subheading } from "@/components/heading";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function TrackingPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <Heading>Order Tracking</Heading>
      <Subheading>Enter your order ID to track the status of your purchase.</Subheading>
      
      <div className="mt-6 flex gap-4">
        <Input placeholder="Order ID (e.g., #1234)" className="flex-1" />
        <Button>Track</Button>
      </div>

      <div className="mt-10 border-l-2 border-zinc-200 dark:border-zinc-700 pl-8 ml-4 space-y-8">
        <div className="relative">
            <div className="absolute -left-[41px] bg-blue-500 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900"></div>
            <Text className="font-semibold">Order Placed</Text>
            <Text className="text-zinc-500 text-sm">Oct 24, 2024 - 10:30 AM</Text>
        </div>
         <div className="relative">
            <div className="absolute -left-[41px] bg-blue-500 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900"></div>
            <Text className="font-semibold">Payment Confirmed</Text>
            <Text className="text-zinc-500 text-sm">Oct 24, 2024 - 10:35 AM</Text>
        </div>
         <div className="relative">
            <div className="absolute -left-[41px] bg-zinc-300 dark:bg-zinc-600 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900"></div>
             <Text className="font-semibold text-zinc-500">Processing</Text>
        </div>
      </div>
    </div>
  );
}
