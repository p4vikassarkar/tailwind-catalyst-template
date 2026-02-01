'use client'

import { Avatar } from '@/components/avatar'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Input, InputGroup } from "@/components/input"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Text } from "@/components/text"
import { useState, useMemo } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "1001",
      date: "Oct 28, 2024",
      customer: { name: "Leslie Alexander" },
      product: { name: "Vintage Camera Canon AE-1", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$120.00" },
      url: "#"
    },
    {
      id: "1002",
      date: "Oct 25, 2024",
      customer: { name: "Michael Foster" },
      product: { name: "Retro Nike Air Max 90", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$80.00" },
      url: "#"
    },
     {
      id: "1003",
      date: "Sep 15, 2024",
      customer: { name: "Dries Vincent" },
      product: { name: "Handmade Leather Wallet", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$45.00" },
      url: "#"
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.id.includes(search) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  return (
    <>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <Heading>My Orders</Heading>
        <div className="flex gap-4">
             <div className="w-full max-w-xs min-w-[250px]">
                 <InputGroup>
                    <MagnifyingGlassIcon data-slot="icon" />
                    <Input 
                        name="search" 
                        placeholder="Search orders..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </div>
        </div>
      </div>
      
      {orders.length > 0 ? (
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
            <TableRow>
                <TableHeader>Order number</TableHeader>
                <TableHeader>Purchase date</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Product</TableHeader>
                <TableHeader className="text-right">Amount</TableHeader>
            </TableRow>
            </TableHead>
            <TableBody>
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="text-zinc-500">{order.date}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                        <Avatar src={order.product.thumbUrl} className="size-6" />
                        <span>{order.product.name}</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">{order.amount.usd}</TableCell>
                    </TableRow>
                ))
            ) : (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                        No orders found matching "{search}"
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      ) : (
         <div className="mt-8 p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <Text className="text-lg">No orders found.</Text>
        </div>
      )}
    </>
  )
}
