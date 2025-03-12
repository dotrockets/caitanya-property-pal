
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaintenanceRequest } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {
  open: "bg-red-100 text-red-800 hover:bg-red-200",
  inProgress: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  completed: "bg-green-100 text-green-800 hover:bg-green-200",
};

const getStatusColorClass = (status: string) => {
  const key = status.replace(/\s+/g, '') as keyof typeof statusColors;
  return statusColors[key] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
};

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
}

export function MaintenanceList({ requests }: MaintenanceListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>Recent maintenance requests</CardDescription>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/maintenance">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <Link
                  to={`/maintenance/${request.id}`}
                  className="font-medium truncate hover:text-caitanya-purple transition-colors"
                >
                  {request.title}
                </Link>
                <div className="text-sm text-muted-foreground truncate">
                  {request.propertyName} • Reported {new Date(request.dateReported).toLocaleDateString()}
                </div>
              </div>
              <Badge className={getStatusColorClass(request.status)}>
                {request.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
