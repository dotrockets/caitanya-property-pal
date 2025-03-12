
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Trash, 
  ArrowLeft, 
  Home, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  ClipboardList 
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { maintenanceRequests, tenants } from "@/services/mockData";
import { useState } from "react";

const statusColors = {
  open: "bg-red-100 text-red-800",
  "in progress": "bg-amber-100 text-amber-800",
  completed: "bg-green-100 text-green-800",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

const MaintenanceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const request = maintenanceRequests.find((r) => r.id === id);
  
  const [status, setStatus] = useState(request?.status || "open");
  const [note, setNote] = useState("");
  
  if (!request) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Request Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The maintenance request you are looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/maintenance">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Maintenance
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const tenant = tenants.find(t => t.id === request.tenantId);

  return (
    <MainLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/maintenance">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{request.title}</h1>
            <p className="text-muted-foreground">
              Maintenance request for {request.propertyName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-700">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className={statusColors[request.status]}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Badge>
                <Badge className={priorityColors[request.priority]}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{request.description}</p>
                </div>
                
                {request.assignedTo && (
                  <div>
                    <h3 className="font-semibold mb-2">Assigned To</h3>
                    <p>{request.assignedTo}</p>
                  </div>
                )}
                
                {request.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-muted-foreground">{request.notes}</p>
                  </div>
                )}
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Update Status</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Add a note..." 
                        className="h-10 min-h-10 resize-none" 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    
                    <Button className="shrink-0">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {request.dateResolved && (
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Request Completed</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(request.dateResolved).toLocaleString()}
                      </div>
                      <div className="mt-2 text-sm">
                        The issue has been resolved and the maintenance request has been completed.
                      </div>
                    </div>
                  </div>
                )}
                
                {request.assignedTo && (
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Request Assigned</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(request.dateReported).toLocaleString()}
                      </div>
                      <div className="mt-2 text-sm">
                        This request has been assigned to {request.assignedTo}.
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Request Created</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(request.dateReported).toLocaleString()}
                    </div>
                    <div className="mt-2 text-sm">
                      {request.tenantName} reported an issue with {request.title}.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Property</div>
                    <Link 
                      to={`/properties/${request.propertyId}`}
                      className="hover:text-caitanya-purple transition-colors"
                    >
                      {request.propertyName}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Reported By</div>
                    <Link 
                      to={`/tenants/${request.tenantId}`}
                      className="hover:text-caitanya-purple transition-colors"
                    >
                      {request.tenantName}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Date Reported</div>
                    <div>{new Date(request.dateReported).toLocaleDateString()}</div>
                  </div>
                </div>
                
                {request.dateResolved && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Date Resolved</div>
                      <div>{new Date(request.dateResolved).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Priority</div>
                    <Badge className={priorityColors[request.priority]}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge className={statusColors[request.status]}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {tenant && (
            <Card>
              <CardHeader>
                <CardTitle>Tenant Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tenant.image} alt={tenant.name} />
                    <AvatarFallback>{tenant.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link 
                      to={`/tenants/${tenant.id}`}
                      className="font-medium hover:text-caitanya-purple transition-colors"
                    >
                      {tenant.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">{tenant.email}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{tenant.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Assign to Staff
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Contact Tenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MaintenanceDetail;
