'use client'

import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useState, useMemo } from "react";

export default function CartPage() {
  // Mock data for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Project Management Tool", price: 29.00, priceDisplay: "$29.00/mo", category: "Productivity" },
    { id: 2, name: "Cloud Storage Plus", price: 15.00, priceDisplay: "$15.00/mo", category: "Infrastructure" },
  ]);

  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return cartItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [cartItems, search]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (id: number) => {
      setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Heading>Shopping Cart</Heading>
      
      {cartItems.length > 0 ? (
        <>
            <div className="mt-6 mb-4 flex justify-between items-center">
                <Text className="text-zinc-500">{cartItems.length} items in your cart</Text>
                 <div className="w-full max-w-xs">
                     <InputGroup>
                        <MagnifyingGlassIcon data-slot="icon" />
                        <Input 
                            name="search" 
                            placeholder="Search cart items..." 
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
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader></TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.length > 0 ? (
                             filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium text-zinc-900 dark:text-white">{item.name}</TableCell>
                                    <TableCell className="text-zinc-500">{item.category}</TableCell>
                                    <TableCell>{item.priceDisplay}</TableCell>
                                    <TableCell className="text-right">
                                        <Button plain onClick={() => removeItem(item.id)}>
                                            <TrashIcon className="size-4 text-zinc-400 hover:text-red-500 transition-colors" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                                    No items found matching "{search}"
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-8 flex justify-end">
                <div className="w-full sm:max-w-xs space-y-4">
                    <div className="flex justify-between py-2 border-t border-zinc-200 dark:border-zinc-800">
                        <Text className="font-semibold">Subtotal</Text>
                        <Text className="font-semibold">${subtotal.toFixed(2)}/mo</Text>
                    </div>
                    <Button color="blue" className="w-full justify-center">CHECKOUT</Button>
                </div>
            </div>
        </>
      ) : (
        <div className="mt-8 p-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <Text className="text-lg">Your cart is currently empty.</Text>
            <div className="mt-6">
                <Button href="/products" color="blue">Browse Products</Button>
            </div>
        </div>
      )}
    </div>
  );
}
