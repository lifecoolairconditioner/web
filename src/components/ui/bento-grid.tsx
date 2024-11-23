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
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto",
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
  image,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  image?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
        className
      )}
      role="article"
      aria-labelledby={title ? "bento-item-title" : undefined}
      aria-describedby={description ? "bento-item-description" : undefined}
    >
      {header && <div className="mb-4">{header}</div>}
      {title && (
        <h3 id="bento-item-title" className="text-lg font-semibold">
          {title}
        </h3>
      )}
      {description && (
        <p id="bento-item-description" className="text-muted-foreground">
          {description}
        </p>
      )}
      {image && (
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            fill
            src={image}
            alt={title ? `${title} image` : "Bento item image"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};
