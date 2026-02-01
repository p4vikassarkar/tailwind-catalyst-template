'use client'

import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Input, InputGroup } from "@/components/input"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Text } from "@/components/text"
import { useState, useMemo } from 'react'

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-2001",
      date: "Jan 28, 2026",
      customer: { name: "Alex Thompson", email: "alex@example.com" },
      product: { name: "Vintage Camera Canon AE-1", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$350.00" },
      status: "Completed",
      url: "#"
    },
    {
      id: "ORD-2002",
      date: "Jan 27, 2026",
      customer: { name: "Sarah Williams", email: "sarah@example.com" },
      product: { name: "Retro Nike Air Max 90", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$180.00" },
      status: "Shipped",
      url: "#"
    },
    {
      id: "ORD-2003",
      date: "Jan 26, 2026",
      customer: { name: "Marcus Chen", email: "marcus@example.com" },
      product: { name: "Handmade Leather Wallet", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$75.00" },
      status: "Processing",
      url: "#"
    },
    {
      id: "ORD-2004",
      date: "Jan 25, 2026",
      customer: { name: "Emily Rodriguez", email: "emily@example.com" },
      product: { name: "Vintage Vinyl Record Set", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$120.00" },
      status: "Pending",
      url: "#"
    },
    {
      id: "ORD-2005",
      date: "Jan 24, 2026",
      customer: { name: "David Kim", email: "david@example.com" },
      product: { name: "Antique Pocket Watch", thumbUrl: "/users/erica.jpg" },
      amount: { usd: "$450.00" },
      status: "Completed",
      url: "#"
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.product.name.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Shipped': return 'blue';
      case 'Processing': return 'yellow';
      case 'Pending': return 'zinc';
      case 'Cancelled': return 'red';
      default: return 'zinc';
    }
  };

  return (
    <>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <Heading>Sales Orders</Heading>
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
                <TableHeader>Order ID</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Product</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader className="text-right">Amount</TableHeader>
            </TableRow>
            </TableHead>
            <TableBody>
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <TableRow key={order.id} href={order.url} title={`Order ${order.id}`}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="text-zinc-500">{order.date}</TableCell>
                    <TableCell>
                        <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-zinc-500">{order.customer.email}</div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                        <Avatar src={order.product.thumbUrl} className="size-6" />
                        <span className="truncate max-w-[200px]">{order.product.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{order.amount.usd}</TableCell>
                    </TableRow>
                ))
            ) : (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                        No orders found matching "{search}"
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      ) : (
         <div className="mt-8 flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4 mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-zinc-400" />
            </div>
            <Heading level={3} className="text-lg font-semibold text-zinc-900 dark:text-white">No sales orders yet</Heading>
            <Text className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                When customers purchase your products, their orders will appear here.
            </Text>
        </div>
      )}
    </>
  )
}
