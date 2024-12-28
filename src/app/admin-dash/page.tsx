"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getAllOrders } from "@/apis/order"; // Import your API function

// Define the Order interface to match the structure of your orders data
interface Order {
  _id: string;
  contact: {
    name: string;
  };
  rental: boolean;
  status: string;
  totalPrice: number;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]); // Use the defined type for orders
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch orders on component mount
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(); // Assuming this function returns the orders
        setOrders(response); // Set the fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#010101]">Dashboard</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.contact.name}</TableCell>
                    <TableCell>
                      {order.rental ? "AC rent" : "Other service"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "Completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>₹ {order.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No orders found.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Link href={"/admin-dash/orders"}>
          <Button variant="outline">View All Orders</Button>
        </Link>
        <Button>Generate Detailed Report</Button>
      </div>
    </div>
  );
}
