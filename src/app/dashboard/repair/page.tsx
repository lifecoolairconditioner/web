"use client";

import { useState } from "react";
import { Search,  Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample repair requests data
const repairRequests = [
  {
    id: "R001",
    customerName: "Rahul Sharma",
    serviceType: "General Servicing",
    dateRequested: "2023-06-15",
    status: "Pending",
  },
  {
    id: "R002",
    customerName: "Priya Patel",
    serviceType: "Cooling Issues",
    dateRequested: "2023-06-16",
    status: "In Progress",
  },
  {
    id: "R003",
    customerName: "Amit Kumar",
    serviceType: "Fan Motor Replacement",
    dateRequested: "2023-06-17",
    status: "Completed",
  },
  {
    id: "R004",
    customerName: "Sneha Gupta",
    serviceType: "Electrical Repairs",
    dateRequested: "2023-06-18",
    status: "Pending",
  },
  {
    id: "R005",
    customerName: "Vikram Singh",
    serviceType: "Gas Refilling",
    dateRequested: "2023-06-19",
    status: "In Progress",
  },
];

// Sample technicians data
const technicians = [
  { id: "T001", name: "Rajesh Kumar" },
  { id: "T002", name: "Suresh Patel" },
  { id: "T003", name: "Anita Desai" },
];

// Sample inventory data
const inventory = [
  { id: "I001", name: "AC Compressor", quantity: 5 },
  { id: "I002", name: "Refrigerant Gas", quantity: 10 },
  { id: "I003", name: "Fan Motor", quantity: 8 },
  { id: "I004", name: "Capacitor", quantity: 15 },
  { id: "I005", name: "Air Filter", quantity: 20 },
];

export default function RepairAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<
    (typeof repairRequests)[0] | null
  >(null);

  const filteredRequests = repairRequests.filter(
    (request) =>
      (request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || request.status.toLowerCase() === statusFilter)
  );

  const handleAssignTechnician = (requestId: string, technicianId: string) => {
    // Here you would typically update the request with the assigned technician in your backend
    console.log(`Assigning technician ${technicianId} to request ${requestId}`);
  };

  const handleTrackStatus = (request: (typeof repairRequests)[0]) => {
    setSelectedRequest(request);
    setIsStatusModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#010101] mb-6">
        Repair & Maintenance Dashboard
      </h1>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Repair Requests</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Repair Requests</CardTitle>
              <CardDescription>
                Manage and track repair and maintenance requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Request ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead className="w-[120px]">
                        Date Requested
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.id}
                        </TableCell>
                        <TableCell>{request.customerName}</TableCell>
                        <TableCell>{request.serviceType}</TableCell>
                        <TableCell>{request.dateRequested}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${
                              request.status === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : request.status === "In Progress"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-green-200 text-green-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Select
                              onValueChange={(technicianId) =>
                                handleAssignTechnician(request.id, technicianId)
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Assign" />
                              </SelectTrigger>
                              <SelectContent>
                                {technicians.map((technician) => (
                                  <SelectItem
                                    key={technician.id}
                                    value={technician.id}
                                  >
                                    {technician.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTrackStatus(request)}
                              className="bg-[#ffc300] text-[#010101] hover:bg-[#e6b000]"
                            >
                              <Activity className="h-4 w-4 mr-2" />
                              Track
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Service Inventory</CardTitle>
              <CardDescription>
                Track parts and tools availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inventory.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.quantity}</div>
                      <p className="text-xs text-muted-foreground">in stock</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Job Progress</DialogTitle>
            <DialogDescription>
              Status for request {selectedRequest?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">
                Customer: {selectedRequest?.customerName}
              </h3>
              <p>Service: {selectedRequest?.serviceType}</p>
              <p>Date Requested: {selectedRequest?.dateRequested}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Progress</h3>
              <Progress
                value={
                  selectedRequest?.status === "Completed"
                    ? 100
                    : selectedRequest?.status === "In Progress"
                    ? 50
                    : 25
                }
              />
              <p>{selectedRequest?.status}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsStatusModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
