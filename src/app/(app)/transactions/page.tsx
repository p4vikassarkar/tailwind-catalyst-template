'use client'

import { Heading, Subheading } from "@/components/heading";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";
import { Input, InputGroup } from "@/components/input"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Text } from "@/components/text"
import { useState, useMemo } from 'react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([
      {
          id: 1,
          date: "Oct 24, 2024",
          description: "Marketing Pro Suite - Monthly",
          method: "Visa •••• 4242",
          amount: "$49.00",
          invoiceUrl: "#"
      },
      {
          id: 2,
          date: "Sep 24, 2024",
          description: "Marketing Pro Suite - Monthly",
          method: "Visa •••• 4242",
          amount: "$49.00",
          invoiceUrl: "#"
      },
      {
          id: 3,
          date: "Aug 24, 2024",
          description: "Marketing Pro Suite - Monthly",
          method: "Visa •••• 4242",
          amount: "$49.00",
          invoiceUrl: "#"
      }
  ]);

  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.amount.includes(search) ||
      transaction.date.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
            <Heading>Transaction History</Heading>
            <Subheading>View all your past purchases and invoices.</Subheading>
        </div>
         <div className="w-full max-w-xs min-w-[250px]">
             <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input 
                    name="search" 
                    placeholder="Search transactions..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
        </div>
      </div>

       {transactions.length > 0 ? (
       <Table className="mt-8">
        <TableHead>
            <TableRow>
                <TableHeader>Date</TableHeader>
                <TableHeader>Description</TableHeader>
                <TableHeader>Payment Method</TableHeader>
                <TableHeader className="text-right">Amount</TableHeader>
                <TableHeader className="text-right">Invoice</TableHeader>
            </TableRow>
        </TableHead>
        <TableBody>
             {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell className="text-right">{transaction.amount}</TableCell>
                        <TableCell className="text-right"><a href={transaction.invoiceUrl} className="text-blue-500 hover:underline">Download</a></TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                         No transactions found matching "{search}"
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
      </Table>
       ) : (
        <div className="mt-8 p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <Text className="text-lg">No transactions found.</Text>
        </div>
       )}
    </div>
  );
}
