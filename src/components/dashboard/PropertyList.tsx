
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyListProps {
  properties: Property[];
}

export function PropertyList({ properties }: PropertyListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>
              Recently added or updated properties
            </CardDescription>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/properties">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <div
                className="w-12 h-12 rounded-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${property.image})`,
                }}
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/properties/${property.id}`}
                  className="font-medium truncate hover:text-caitanya-purple transition-colors"
                >
                  {property.name}
                </Link>
                <div className="text-sm text-muted-foreground truncate">
                  {property.address}
                </div>
              </div>
              <div className="text-sm font-medium">${property.rent.toLocaleString()}/mo</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
