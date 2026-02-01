import { Heading, Subheading } from "@/components/heading";
import { Stat } from "@/app/stat";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/table";

export default function SellerDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
        <Heading>Seller Dashboard</Heading>
        <Subheading>Overview of your sales and performance.</Subheading>

         <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <Stat title="Total Revenue" value="$12,450" change="+15%" />
            <Stat title="Products Sold" value="342" change="+8%" />
            <Stat title="Active Subscribers" value="120" change="+22%" />
            <Stat title="Average Rating" value="4.8" change="0%" />
        </div>

        <Heading level={2} className="mt-12 text-lg">Recent Sales</Heading>
        <Table className="mt-4">
             <TableHead>
                <TableRow>
                    <TableHeader>Transaction ID</TableHeader>
                    <TableHeader>Product</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>#TXN-8823</TableCell>
                    <TableCell>Enterprise CRM</TableCell>
                    <TableCell>$499.00</TableCell>
                    <TableCell>Oct 24, 2024</TableCell>
                    <TableCell>Completed</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>#TXN-8822</TableCell>
                    <TableCell>Analytics Dashboard</TableCell>
                    <TableCell>$199.00</TableCell>
                    <TableCell>Oct 23, 2024</TableCell>
                    <TableCell>Completed</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  );
}
