"use client";

import { useState } from "react";
import {
  Check,
  RefreshCcw,
  DollarSign,
  FileText,
  BarChart,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample transaction data
const transactions = [
  {
    id: "T001",
    customerName: "Rahul Sharma",
    amount: 5000,
    date: "2023-06-15",
    status: "Completed",
  },
  {
    id: "T002",
    customerName: "Priya Patel",
    amount: 3500,
    date: "2023-06-16",
    status: "Pending",
  },
  {
    id: "T003",
    customerName: "Amit Kumar",
    amount: 7500,
    date: "2023-06-17",
    status: "Completed",
  },
  {
    id: "T004",
    customerName: "Sneha Gupta",
    amount: 4000,
    date: "2023-06-18",
    status: "Failed",
  },
  {
    id: "T005",
    customerName: "Vikram Singh",
    amount: 6000,
    date: "2023-06-19",
    status: "Pending",
  },
];

// Sample financial data
const financialData = {
  dailyRevenue: 25000,
  weeklyRevenue: 150000,
  monthlyRevenue: 600000,
};

export default function PaymentDashboard() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    amount: "",
    description: "",
  });

  const handleConfirmPayment = (transactionId: string) => {
    console.log(`Confirming payment for transaction ${transactionId}`);
    // Here you would typically update the transaction status in your backend
  };

  const handleProcessRefund = (transactionId: string) => {
    console.log(`Processing refund for transaction ${transactionId}`);
    // Here you would typically initiate the refund process in your backend
  };

  const handleGenerateInvoice = () => {
    console.log("Generating invoice:", invoiceDetails);
    // Here you would typically generate and send the invoice
    setIsInvoiceModalOpen(false);
    setInvoiceDetails({ customerName: "", amount: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#010101] mb-6">
        Payment Processing Dashboard
      </h1>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Financial Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                View and manage recent payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Transaction ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>₹{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            transaction.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConfirmPayment(transaction.id)}
                          className="mr-2"
                          disabled={transaction.status !== "Pending"}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProcessRefund(transaction.id)}
                          disabled={transaction.status !== "Completed"}
                        >
                          <RefreshCcw className="h-4 w-4 mr-1" />
                          Refund
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View All Transactions</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsInvoiceModalOpen(true)}
                    className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Daily Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{financialData.dailyRevenue}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Revenue
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{financialData.weeklyRevenue}
                </div>
                <p className="text-xs text-muted-foreground">
                  +15% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{financialData.monthlyRevenue}
                </div>
                <p className="text-xs text-muted-foreground">
                  +10% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Monthly revenue over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-muted-foreground">
                  Revenue chart to be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Customer
              </Label>
              <Input
                id="customerName"
                value={invoiceDetails.customerName}
                onChange={(e) =>
                  setInvoiceDetails({
                    ...invoiceDetails,
                    customerName: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                value={invoiceDetails.amount}
                onChange={(e) =>
                  setInvoiceDetails({
                    ...invoiceDetails,
                    amount: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={invoiceDetails.description}
                onChange={(e) =>
                  setInvoiceDetails({
                    ...invoiceDetails,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleGenerateInvoice}
              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
            >
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
