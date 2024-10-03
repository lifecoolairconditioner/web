"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  ArrowUpDown,
  Calendar,
  User,
  Clock,
  AlertTriangle,
} from "lucide-react";
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
  rental?: string;
  service?: string;
  status: string;
  date: string;
  timeSlot: "3_months" | "6_months" | "1_year";
  paymentStatus: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  technician?: string;
}

const calculateRemainingTime = (date: string, timeSlot: string) => {
  const now = new Date();
  const orderDate = new Date(date);
  const endDate = new Date(orderDate);

  switch (timeSlot) {
    case "3_months":
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "6_months":
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case "1_year":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
  }

  const timeDiff = endDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  return { months, days: days % 30 };
};

const formatTimeSlot = (timeSlot: string) => {
  switch (timeSlot) {
    case "3_months":
      return "3 Months";
    case "6_months":
      return "6 Months";
    case "1_year":
      return "1 Year";
    default:
      return timeSlot;
  }
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: "ascending" | "descending";
  }>({ key: "date", direction: "ascending" });
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
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
      (filterStatus === "all" ||
        order.status.toLowerCase() === filterStatus.toLowerCase()) &&
      order.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rentalOrders = filteredOrders.filter((order) => order.rental);
  const serviceOrders = filteredOrders.filter((order) => order.service);

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

  const OrderTable = ({
    orders,
    isServiceOrder,
  }: {
    orders: Order[];
    isServiceOrder: boolean;
  }) => (
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
              Start Date <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          {!isServiceOrder && (
            <>
              <TableHead>Rental Duration</TableHead>
              <TableHead>Remaining Time</TableHead>
            </>
          )}
          <TableHead>Technician 🔨</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const { months, days } = calculateRemainingTime(
            order.date,
            order.timeSlot
          );
          const isNearingEnd = months === 0 && days < 7;
          return (
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
              {!isServiceOrder && (
                <>
                  <TableCell>{formatTimeSlot(order.timeSlot)}</TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center ${
                        isNearingEnd ? "text-red-500" : ""
                      }`}
                    >
                      {isNearingEnd && (
                        <AlertTriangle className="mr-2 h-4 w-4" />
                      )}
                      {months}m {days}d
                    </div>
                  </TableCell>
                </>
              )}
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
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-6 space-y-6 bg-[#fafafa]"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-[#010101]"
      >
        Order Management 📋
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between items-center"
      >
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search orders..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <Tabs defaultValue="rental" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rental">Rental Orders</TabsTrigger>
          <TabsTrigger value="service" className="bg-black text-white">
            Service Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rental">
          <OrderTable orders={rentalOrders} isServiceOrder={false} />
        </TabsContent>
        <TabsContent value="service">
          <OrderTable orders={serviceOrders} isServiceOrder={true} />
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="bg-white max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Order Details 📦</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="border rounded-xl p-4">
                <Label>Order ID</Label>
                <div>{selectedOrder._id}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Customer 👤</Label>
                <div>{selectedOrder.contact.name}</div>
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
                <Label>Start Date 📅</Label>
                <div>{new Date(selectedOrder.date).toLocaleDateString()}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Rental Duration ⏳</Label>
                <div>{formatTimeSlot(selectedOrder.timeSlot)}</div>
              </div>
              <div className="border rounded-xl p-4">
                <Label>Remaining Time ⏰</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {(() => {
                    const { months, days } = calculateRemainingTime(
                      selectedOrder.date,
                      selectedOrder.timeSlot
                    );
                    const isNearingEnd = months === 0 && days < 7;
                    return (
                      <span className={isNearingEnd ? "text-red-500" : ""}>
                        {isNearingEnd && (
                          <AlertTriangle className="mr-2 h-4 w-4" />
                        )}
                        {months} months and {days} days
                      </span>
                    );
                  })()}
                </div>
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
            </motion.div>
          )}
          <DialogFooter>
            <Button
              className="bg-[#ffc300] text-[#010101] hover:bg-[#ffc300]/90"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
