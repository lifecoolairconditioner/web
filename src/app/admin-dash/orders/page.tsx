"use client";
import React, { useState } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, ChevronDown, ArrowUpDown } from "lucide-react";

const initialOrders = [
  {
    id: 1,
    customer: "John Doe",
    service: "AC Rental",
    status: "Pending",
    date: "2023-06-01",
    amount: 150,
    technician: null,
  },
  {
    id: 2,
    customer: "Jane Smith",
    service: "AC Repair",
    status: "In Progress",
    date: "2023-06-02",
    amount: 80,
    technician: "Mike Johnson",
  },
  {
    id: 3,
    customer: "Bob Wilson",
    service: "AC Maintenance",
    status: "Completed",
    date: "2023-06-03",
    amount: 100,
    technician: "Sarah Lee",
  },
  {
    id: 4,
    customer: "Alice Brown",
    service: "AC Installation",
    status: "Scheduled",
    date: "2023-06-04",
    amount: 200,
    technician: "Tom Davis",
  },
  {
    id: 5,
    customer: "Charlie Green",
    service: "AC Rental",
    status: "Pending",
    date: "2023-06-05",
    amount: 120,
    technician: null,
  },
];

const technicians = ["Mike Johnson", "Sarah Lee", "Tom Davis", "Emma Wilson"];

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
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

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const assignTechnician = (orderId, technicianName) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, technician: technicianName } : order
      )
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#010101]">Order Management</h1>

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
            setOrders(
              initialOrders.filter(
                (order) =>
                  order.customer.toLowerCase().includes(searchTerm) ||
                  order.service.toLowerCase().includes(searchTerm)
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
              <Button variant="ghost" onClick={() => handleSort("customer")}>
                Customer
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("service")}>
                Service
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("date")}>
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("amount")}>
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.service}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.amount}</TableCell>
              <TableCell>
                <Select
                  value={order.technician || ""}
                  onValueChange={(value) => assignTechnician(order.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <Label>Order ID</Label>
                <div>{selectedOrder.id}</div>
              </div>
              <div>
                <Label>Customer</Label>
                <div>{selectedOrder.customer}</div>
              </div>
              <div>
                <Label>Service</Label>
                <div>{selectedOrder.service}</div>
              </div>
              <div>
                <Label>Status</Label>
                <div>{selectedOrder.status}</div>
              </div>
              <div>
                <Label>Date</Label>
                <div>{selectedOrder.date}</div>
              </div>
              <div>
                <Label>Amount</Label>
                <div>${selectedOrder.amount}</div>
              </div>
              <div>
                <Label>Technician</Label>
                <div>{selectedOrder.technician || "Not assigned"}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
