'use client'

import { Heading, Subheading } from "@/components/heading";
import { Button } from "@/components/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";
import { Badge } from "@/components/badge";
import { Input, InputGroup } from "@/components/input";
import { Select } from "@/components/select";
import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const products = [
  { id: 1, name: "Enterprise CRM", price: 499.00, priceDisplay: "$499.00", status: "Active", sales: 124 },
  { id: 2, name: "Analytics Dashboard Pro", price: 199.00, priceDisplay: "$199.00", status: "Active", sales: 85 },
  { id: 3, name: "Email Marketing Tool", price: 29.00, priceDisplay: "$29.00", status: "Draft", sales: 0 },
  { id: 4, name: "HR Management System", price: 299.00, priceDisplay: "$299.00", status: "Archived", sales: 12 },
  { id: 5, name: "Social Media Scheduler", price: 49.00, priceDisplay: "$49.00", status: "Active", sales: 450 },
];

export default function SellerProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("sales_high");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || product.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "sales_high") return b.sales - a.sales;
        if (sortBy === "sales_low") return a.sales - b.sales;
        if (sortBy === "price_high") return b.price - a.price;
        if (sortBy === "price_low") return a.price - b.price;
        return 0; 
      });
  }, [search, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'green';
          case 'Draft': return 'zinc';
          case 'Archived': return 'red';
          default: return 'zinc';
      }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
           <Heading>My Products</Heading>
           <Subheading className="mt-1">Manage the products you are selling on the marketplace.</Subheading>
        </div>
        <Button color="blue">+ Add Product</Button>
      </div>

       <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex-1 min-w-[200px]">
             <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input 
                    name="search" 
                    placeholder="Search my products..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
        </div>
        <div className="w-full sm:w-40">
             <Select name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Status">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
            </Select>
        </div>
         <div className="w-full sm:w-48">
             <Select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
                <option value="sales_high">Sales: High to Low</option>
                <option value="sales_low">Sales: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="price_low">Price: Low to High</option>
            </Select>
        </div>
      </div>

      <div className="mt-6">
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Product Name</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader className="text-right">Sales</TableHeader>
                    <TableHeader className="text-right">Actions</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.priceDisplay}</TableCell>
                            <TableCell>
                                <Badge color={getStatusColor(product.status) as any}>{product.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{product.sales}</TableCell>
                            <TableCell className="text-right">
                                <Button plain>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                     <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                            No products found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
