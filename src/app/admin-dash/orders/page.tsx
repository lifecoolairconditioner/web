"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, ArrowUpDown, Calendar, User } from "lucide-react";

import {
  getAllOrders,
  updateOrderStatus,
  AssignTechnician,
  updatePaymentStatus,
} from "@/apis/order";
import { getAllTechnicians } from "@/apis/technician";

interface Service {
  _id: string;
  name: string;
}

interface Technician {
  _id: string;
  name: string;
  phone: string;
  email: string;
  services: Service[];
  availability: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Order {
  _id: string;
  contact: Contact;
  rental: string;
  status: string;
  date: string;
  timeSlot: string;
  paymentStatus: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  technician?: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchOrdersAndTechnicians = async () => {
      try {
        const ordersData: Order[] = await getAllOrders();
        const techniciansResponse = await getAllTechnicians();

        const techniciansData: Technician[] = techniciansResponse.data;

        setTechnicians(Array.isArray(techniciansData) ? techniciansData : []);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders or technicians:", error);
      }
    };
    fetchOrdersAndTechnicians();
  }, []);

  const handleSort = (key: keyof Order) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    const sortableOrders = [...orders];

    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return sortableOrders;
  }, [orders, sortConfig]);

  const filteredOrders = sortedOrders.filter(
    (order) =>
      filterStatus === "all" ||
      order.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleAssignTechnician = async (
    orderId: string,
    technician: string
  ) => {
    try {
      await AssignTechnician(orderId, technician);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, technician } : order
        )
      );
    } catch (error) {
      console.error("Error assigning technician:", error);
    }
  };

  const handleUpdatePaymentStatus = async (
    orderId: string,
    paymentStatus: string
  ) => {
    try {
      const response = await updatePaymentStatus(orderId, paymentStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...response, paymentStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#010101]">Order Management 📋</h1>

      <div className="flex justify-between items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search orders..."
          className="max-w-sm"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setOrders((prevOrders) =>
              prevOrders.filter((order) =>
                order.contact.name.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("contact")}>
                Customer <User className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("date")}>
                Date <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Technician 🔨</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.contact.name}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) =>
                    handleUpdateOrderStatus(order._id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Select
                  value={order.technician || ""}
                  onValueChange={(value) =>
                    handleAssignTechnician(order._id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech._id} value={tech._id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsDetailsModalOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-white h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Order Details 📦</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="border rounded-xl p-4">
                <Label>Order ID</Label>
                <div>{selectedOrder._id}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Phone 📞</Label>
                <div>{selectedOrder.contact.phone}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Email 📧</Label>
                <div>{selectedOrder.contact.email}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Address 🏠</Label>
                <div>{selectedOrder.contact.address}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Customer 👤</Label>
                <div>{selectedOrder.contact.name}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Status</Label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) =>
                    handleUpdateOrderStatus(selectedOrder._id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending ⏳</SelectItem>
                    <SelectItem value="Approved">Approved ✅</SelectItem>
                    <SelectItem value="Completed">Completed 🎉</SelectItem>
                    <SelectItem value="Cancelled">Cancelled ❌</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Time Slot ⏰</Label>
                <div>{selectedOrder.timeSlot}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Date 📅</Label>
                <div>{new Date(selectedOrder.date).toLocaleDateString()}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Payment Status 💳</Label>
                <Select
                  value={selectedOrder.paymentStatus}
                  onValueChange={(value) =>
                    handleUpdatePaymentStatus(selectedOrder._id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid ✅</SelectItem>
                    <SelectItem value="Unpaid">Unpaid ⏳</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Amount 💵</Label>
                <div>₹{selectedOrder.totalPrice.toFixed(2)}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Technician 🔧</Label>
                <Select
                  value={selectedOrder.technician || ""}
                  onValueChange={(value) =>
                    handleAssignTechnician(selectedOrder._id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign Technician" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech._id} value={tech._id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="p-6 text-md"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
