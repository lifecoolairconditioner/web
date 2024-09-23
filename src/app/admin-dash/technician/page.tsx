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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Search, ArrowUpDown, Plus, X } from "lucide-react";

const initialTechnicians = [
  {
    id: 1,
    name: "Mike Johnson",
    email: "mike@example.com",
    skills: ["AC Repair", "AC Installation", "AC Maintenance"],
    performance: 92,
    completedJobs: 150,
    availability: "Available",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah@example.com",
    skills: ["AC Repair", "AC Maintenance"],
    performance: 88,
    completedJobs: 120,
    availability: "Busy",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Tom Davis",
    email: "tom@example.com",
    skills: ["AC Installation", "AC Maintenance"],
    performance: 95,
    completedJobs: 180,
    availability: "Available",
    rating: 4.9,
  },
];

export default function TechnicianManagement() {
  const [technicians, setTechnicians] = useState(initialTechnicians);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTechnicians = React.useMemo(() => {
    let sortableTechnicians = [...technicians];
    if (sortConfig.key !== null) {
      sortableTechnicians.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTechnicians;
  }, [technicians, sortConfig]);

  const filteredTechnicians = sortedTechnicians.filter(
    (technician) =>
      technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = (technicianId) => {
    setTechnicians(
      technicians.map((tech) =>
        tech.id === technicianId
          ? {
              ...tech,
              availability:
                tech.availability === "Available" ? "Busy" : "Available",
            }
          : tech
      )
    );
  };

  const updateSkills = (technicianId, newSkills) => {
    setTechnicians(
      technicians.map((tech) =>
        tech.id === technicianId ? { ...tech, skills: newSkills } : tech
      )
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#010101]">
        Technician Management
      </h1>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search technicians..."
            className="pl-10 pr-4 py-2 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Technician
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("performance")}>
                Performance
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("availability")}
              >
                Availability
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTechnicians.map((technician) => (
            <TableRow key={technician.id}>
              <TableCell>{technician.id}</TableCell>
              <TableCell>{technician.name}</TableCell>
              <TableCell>{technician.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {technician.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={technician.performance}
                    className="w-[60px]"
                  />
                  <span>{technician.performance}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={technician.availability === "Available"}
                    onCheckedChange={() => toggleAvailability(technician.id)}
                  />
                  <span>{technician.availability}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedTechnician(technician);
                    setIsProfileModalOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Technician Profile</DialogTitle>
            <DialogDescription>
              View and manage technician details and performance metrics.
            </DialogDescription>
          </DialogHeader>
          {selectedTechnician && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <div>{selectedTechnician.name}</div>
              </div>
              <div>
                <Label>Email</Label>
                <div>{selectedTechnician.email}</div>
              </div>
              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTechnician.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center"
                    >
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() =>
                          updateSkills(
                            selectedTechnician.id,
                            selectedTechnician.skills.filter((s) => s !== skill)
                          )
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  <Select
                    onValueChange={(value) =>
                      updateSkills(selectedTechnician.id, [
                        ...selectedTechnician.skills,
                        value,
                      ])
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Add skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC Repair">AC Repair</SelectItem>
                      <SelectItem value="AC Installation">
                        AC Installation
                      </SelectItem>
                      <SelectItem value="AC Maintenance">
                        AC Maintenance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Performance</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Progress
                    value={selectedTechnician.performance}
                    className="w-[100px]"
                  />
                  <span>{selectedTechnician.performance}%</span>
                </div>
              </div>
              <div>
                <Label>Completed Jobs</Label>
                <div>{selectedTechnician.completedJobs}</div>
              </div>
              <div>
                <Label>Rating</Label>
                <div>{selectedTechnician.rating} / 5</div>
              </div>
              <div>
                <Label>Availability</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    checked={selectedTechnician.availability === "Available"}
                    onCheckedChange={() =>
                      toggleAvailability(selectedTechnician.id)
                    }
                  />
                  <span>{selectedTechnician.availability}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsProfileModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
