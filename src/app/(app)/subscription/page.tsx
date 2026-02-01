'use client'

import { Heading, Subheading } from "@/components/heading";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";
import { Badge } from "@/components/badge";
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState, useMemo } from "react";
import { Text } from "@/components/text";
import { Button } from "@/components/button";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Marketing Pro Suite", plan: "Monthly", nextBilling: "Nov 01, 2024", status: "Active", amount: "$49.00" },
    { id: 2, name: "DevTools CI/CD", plan: "Yearly", nextBilling: "Aug 15, 2025", status: "Active", amount: "$120.00" },
    { id: 3, name: "Cloud Storage", plan: "Monthly", nextBilling: "Oct 25, 2024", status: "Past Due", amount: "$15.00" },
  ]);

  const [search, setSearch] = useState("");

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase()) || 
      sub.plan.toLowerCase().includes(search.toLowerCase())
    );
  }, [subscriptions, search]);

  return (
    <div className="max-w-6xl mx-auto">
      <Heading>My Subscriptions</Heading>
      <Subheading>Manage your active product subscriptions.</Subheading>

      {subscriptions.length > 0 ? (
        <>
            <div className="mt-6 mb-4 flex justify-between items-center flex-wrap gap-4">
                 <Text className="text-zinc-500">{subscriptions.length} active subscriptions</Text>
                 <div className="w-full max-w-xs">
                     <InputGroup>
                        <MagnifyingGlassIcon data-slot="icon" />
                        <Input 
                            name="search" 
                            placeholder="Search subscriptions..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>

            <div className="mt-2 border rounded-lg border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Product</TableHeader>
                            <TableHeader>Plan</TableHeader>
                            <TableHeader>Next Billing Date</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader className="text-right">Amount</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSubscriptions.length > 0 ? (
                            filteredSubscriptions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="font-medium text-zinc-900 dark:text-white">{sub.name}</TableCell>
                                    <TableCell>{sub.plan}</TableCell>
                                    <TableCell>{sub.nextBilling}</TableCell>
                                    <TableCell>
                                        <Badge color={sub.status === 'Active' ? 'green' : 'red'}>{sub.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{sub.amount}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                                    No subscriptions found matching "{search}"
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
      ) : (
         <div className="mt-8 p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <Text className="text-lg">You have no active subscriptions.</Text>
            <div className="mt-6">
                <Button href="/products" color="blue">Browse Products</Button>
            </div>
        </div>
      )}
    </div>
  );
}
