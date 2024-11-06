import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string; // Added image prop for optional image support
}) => {
  return (
    <div
      className={cn(
        "row-span-1 mb-12 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      role="article" // Added role for semantic meaning
      aria-labelledby={title ? "bento-item-title" : undefined} // Optional ARIA attributes
      aria-describedby={description ? "bento-item-description" : undefined}
    >
      {header}
      <div className="">{icon}</div>
      {image && (
        <Image
          width={100}
          height={100}
          src={image}
          alt={title ? `${title} image` : "Bento item image"} // Accessible alt text
          className="rounded-md h-full" // Styling for the image
        />
      )}
    </div>
  );
};
