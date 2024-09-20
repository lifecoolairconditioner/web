"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export interface Vendor {
  id: number;
  name: string;
  gstin: string;
  contactPerson: string;
  phone: string;
  email: string;
  msmeRegistered: boolean;
  msmeNumber: string;
  productCategories: string[];
  rating: number;
  tdsApplicable: boolean;
  tdsPercentage: number;
}

interface VendorFormProps {
  vendor: Vendor | null;
  onSubmit: (vendor: Omit<Vendor, "id">) => Promise<void>; // Ensure onSubmit returns a Promise
}

const VendorForm: React.FC<VendorFormProps> = ({ vendor, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Vendor, "id">>({
    name: "",
    gstin: "",
    contactPerson: "",
    phone: "",
    email: "",
    msmeRegistered: false,
    msmeNumber: "",
    productCategories: [],
    rating: 0,
    tdsApplicable: false,
    tdsPercentage: 0,
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        gstin: vendor.gstin,
        contactPerson: vendor.contactPerson,
        phone: vendor.phone,
        email: vendor.email,
        msmeRegistered: vendor.msmeRegistered,
        msmeNumber: vendor.msmeNumber,
        productCategories: vendor.productCategories,
        rating: vendor.rating,
        tdsApplicable: vendor.tdsApplicable,
        tdsPercentage: vendor.tdsPercentage,
      });
    }
  }, [vendor]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 overflow-auto p-3 h-[80vh]"
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="text-red-600">{errors.name}</div>}
        </div>
        <div>
          <Label htmlFor="gstin">GSTIN</Label>
          <Input
            id="gstin"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            required
            pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
          />
          {errors.gstin && <div className="text-red-600">{errors.gstin}</div>}
        </div>
        <div>
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
          {errors.contactPerson && (
            <div className="text-red-600">{errors.contactPerson}</div>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <div className="text-red-600">{errors.phone}</div>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}
        </div>
        <div>
          <Label htmlFor="msmeRegistered">MSME Registered</Label>
          <Checkbox
            id="msmeRegistered"
            name="msmeRegistered"
            checked={formData.msmeRegistered}
            onCheckedChange={(checked) =>
              handleChange({
                target: { name: "msmeRegistered", type: "checkbox", checked },
              } as ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
        {formData.msmeRegistered && (
          <div>
            <Label htmlFor="msmeNumber">MSME Number</Label>
            <Input
              id="msmeNumber"
              name="msmeNumber"
              value={formData.msmeNumber}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <Label htmlFor="productCategories">Product Categories</Label>
          <Input
            id="productCategories"
            name="productCategories"
            value={formData.productCategories.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                productCategories: e.target.value
                  .split(",")
                  .map((category) => category.trim()),
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={5}
          />
        </div>
        <div>
          <Label htmlFor="tdsApplicable">TDS Applicable</Label>
          <Checkbox
            id="tdsApplicable"
            name="tdsApplicable"
            checked={formData.tdsApplicable}
            onCheckedChange={(checked) =>
              handleChange({
                target: { name: "tdsApplicable", type: "checkbox", checked },
              } as ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
        {formData.tdsApplicable && (
          <div>
            <Label htmlFor="tdsPercentage">TDS Percentage</Label>
            <Input
              id="tdsPercentage"
              name="tdsPercentage"
              type="number"
              value={formData.tdsPercentage}
              onChange={handleChange}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>
      <Button className="shadow-xl shadow-black" type="submit">
        Save
      </Button>
    </form>
  );
};

export default VendorForm;
