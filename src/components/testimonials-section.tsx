import { useState, useEffect } from "react";
import { Star, Trash2, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  date: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`
      );
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.log(error);

      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete testimonial");

      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      setShowDeleteDialog(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.log(error);
      setError("Failed to delete testimonial");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    action: "add" | "edit"
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const testimonialData = {
      name: formData.get("name"),
      email: formData.get("email"),
      rating: Number(formData.get("rating")),
      text: formData.get("text"),
    };

    try {
      if (action === "edit" && selectedTestimonial) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${selectedTestimonial._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonialData),
          }
        );

        if (!response.ok) throw new Error("Failed to update testimonial");

        const updatedTestimonial = await response.json();
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === selectedTestimonial._id ? updatedTestimonial : t
          )
        );
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonialData),
          }
        );

        if (!response.ok) throw new Error("Failed to add testimonial");

        const newTestimonial = await response.json();
        setTestimonials((prev) => [...prev, newTestimonial]);
      }

      setShowEditDialog(false);
      setShowAddDialog(false);
      setSelectedTestimonial(null);
      form.reset();
    } catch (error) {
      console.log(error);
      setError(`Failed to ${action} testimonial`);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="p-4 text-center">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => handleSubmit(e, "add")}
              className="space-y-4"
            >
              <div>
                <Input name="name" placeholder="Name" required />
              </div>
              <div>
                <Input type="email" name="email" placeholder="Email" required />
              </div>
              <div>
                <Input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div>
                <Textarea name="text" placeholder="Review text" required />
              </div>
              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Testimonial</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Review</TableHead>
              <TableHead className="w-[100px]">Rating</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell className="font-medium">
                  <div>{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.email}
                  </div>
                </TableCell>
                <TableCell>{testimonial.text}</TableCell>
                <TableCell>{renderStars(testimonial.rating)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog
                      open={
                        showEditDialog &&
                        selectedTestimonial?._id === testimonial._id
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setShowEditDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Testimonial</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => handleSubmit(e, "edit")}
                          className="space-y-4"
                        >
                          <div>
                            <Input
                              name="name"
                              placeholder="Name"
                              defaultValue={testimonial.name}
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="email"
                              name="email"
                              placeholder="Email"
                              defaultValue={testimonial.email}
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              name="rating"
                              placeholder="Rating (1-5)"
                              defaultValue={testimonial.rating}
                              min="1"
                              max="5"
                              required
                            />
                          </div>
                          <div>
                            <Textarea
                              name="text"
                              placeholder="Review text"
                              defaultValue={testimonial.text}
                              required
                            />
                          </div>
                          <div className="flex justify-end gap-4">
                            <DialogClose asChild>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setShowEditDialog(false);
                                  setSelectedTestimonial(null);
                                }}
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={
                        showDeleteDialog &&
                        selectedTestimonial?._id === testimonial._id
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Testimonial</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>
                            Are you sure you want to delete this testimonial?
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            This action cannot be undone.
                          </p>
                        </div>
                        <div className="flex justify-end gap-4">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowDeleteDialog(false);
                                setSelectedTestimonial(null);
                              }}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(testimonial._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}