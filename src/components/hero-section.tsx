import { Hero } from "@/components/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  data: Hero | null;
  onSubmit: (formData: FormData) => void;
}

export default function HeroSection({ data, onSubmit }: HeroSectionProps) {
  if (!data) return <div>Loading...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={data.title}
          className="mt-1 block w-full"
        />
      </div>
      {/* Add other form fields for subtitle, description, buttonText, buttonLink, etc. */}
      <div>
        <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700">
          Background Image
        </label>
        <Input
          type="file"
          id="backgroundImage"
          name="backgroundImage"
          accept="image/*"
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Highlights
        </label>
        {data.highlights.map((highlight, index) => (
          <div key={highlight._id} className="flex space-x-2 mt-2">
            <Input
              type="text"
              name={`highlightIcon${index}`}
              defaultValue={highlight.icon}
              placeholder="Icon"
              className="w-1/3"
            />
            <Input
              type="text"
              name={`highlightLabel${index}`}
              defaultValue={highlight.label}
              placeholder="Label"
              className="w-2/3"
            />
          </div>
        ))}
      </div>
      <Button type="submit">Update Hero Section</Button>
    </form>
  );
}

