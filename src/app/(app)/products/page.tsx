'use client'

import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { Input, InputGroup } from "@/components/input";
import { Select } from "@/components/select";
import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const availableProducts = [
  { id: 1, name: "Project Management Tool", price: 29, priceDisplay: "$29/mo", category: "Productivity", description: "Manage your team projects efficiently." },
  { id: 2, name: "Cloud Storage Plus", price: 15, priceDisplay: "$15/mo", category: "Infrastructure", description: "Secure cloud storage for all your files." },
  { id: 3, name: "DevOps Pipeline", price: 99, priceDisplay: "$99/mo", category: "Developer Tools", description: "Automate your deployments with ease." },
  { id: 4, name: "AI Writer Assistant", price: 49, priceDisplay: "$49/mo", category: "AI & ML", description: "Generate content faster with AI." },
  { id: 5, name: "Analytics Pro", price: 199, priceDisplay: "$199/mo", category: "Analytics", description: "Deep dive into your user data." },
  { id: 6, name: "Email Marketing Suite", price: 39, priceDisplay: "$39/mo", category: "Marketing", description: "Reach your customers with ease." },
];

const categories = ["All", ...Array.from(new Set(availableProducts.map(p => p.category)))];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = useMemo(() => {
    return availableProducts
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                              product.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "price_low") return a.price - b.price;
        if (sortBy === "price_high") return b.price - a.price;
        return 0; // Default (newest / id)
      });
  }, [search, category, sortBy]);

  return (
    <div className="max-w-6xl mx-auto">
      <Heading>Products</Heading>
      <Text className="mt-2 text-zinc-500">Explore and buy the best tools for your business.</Text>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 min-w-[200px]">
             <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input 
                    name="search" 
                    placeholder="Search products..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
        </div>
        <div className="w-full sm:w-48">
             <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </Select>
        </div>
         <div className="w-full sm:w-48">
             <Select name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
            </Select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
                <div key={product.id} className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col transition-all hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <Heading level={3} className="text-lg">{product.name}</Heading>
                        <span className="inline-flex items-center rounded-md bg-zinc-50 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/10 dark:ring-white/10">
                            {product.category}
                        </span>
                    </div>
                    <Text className="mt-2 flex-1">{product.description}</Text>
                    <div className="mt-6 flex items-center justify-between">
                        <Text className="font-bold text-lg">{product.priceDisplay}</Text>
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-span-full py-12 text-center">
                <Text className="text-zinc-500">No products found matching your criteria.</Text>
                <Button plain className="mt-4" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</Button>
            </div>
        )}
      </div>
    </div>
  );
}
