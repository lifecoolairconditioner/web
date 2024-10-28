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
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      role="article" // Added role for semantic meaning
      aria-labelledby={title ? "bento-item-title" : undefined} // Optional ARIA attributes
      aria-describedby={description ? "bento-item-description" : undefined}
    >
      {header}
      {image && (
        <Image
          width={100}
          height={100}
          src={image}
          alt={title ? `${title} image` : "Bento item image"} // Accessible alt text
          className="rounded-md h-full" // Styling for the image
        />
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div
          id="bento-item-title" // Added ID for accessibility
          className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2"
        >
          {title}
        </div>
        <div
          id="bento-item-description" // Added ID for accessibility
          className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300"
        >
          {description}
        </div>
      </div>
    </div>
  );
};
