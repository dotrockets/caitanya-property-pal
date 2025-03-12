
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cva } from "class-variance-authority";

const iconVariants = cva(
  "p-2 rounded-md", {
    variants: {
      color: {
        purple: "bg-caitanya-purple/10 text-caitanya-purple",
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        amber: "bg-amber-100 text-amber-600"
      }
    },
    defaultVariants: {
      color: "purple"
    }
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  color?: "purple" | "blue" | "green" | "amber";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "purple"
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={iconVariants({ color })}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
