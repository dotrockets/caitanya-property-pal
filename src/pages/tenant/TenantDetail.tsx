
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  Trash, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Home, 
  Calendar, 
  DollarSign, 
  FileText, 
  Wrench 
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { tenants, properties, maintenanceRequests, payments } from "@/services/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TenantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tenant = tenants.find((t) => t.id === id);
  
  if (!tenant) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Tenant Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The tenant you are looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/tenants">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tenants
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const property = properties.find(p => p.id === tenant.propertyId);
  const tenantMaintenance = maintenanceRequests.filter(m => m.tenantId === tenant.id);
  const tenantPayments = payments.filter(p => p.tenantId === tenant.id);

  return (
    <MainLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/tenants">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
            <p className="text-muted-foreground">
              Tenant at {tenant.propertyName}
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
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={tenant.image} alt={tenant.name} />
                  <AvatarFallback className="text-2xl">{tenant.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{tenant.name}</h2>
                <p className="text-muted-foreground">{tenant.email}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <Link 
                    to={`/properties/${tenant.propertyId}`}
                    className="hover:text-caitanya-purple transition-colors"
                  >
                    {tenant.propertyName}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Lease Period</div>
                    <div>
                      {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Rent</div>
                    <div className="font-medium">${tenant.rentAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Lease
              </Button>
              <Button className="w-full justify-start">
                <Wrench className="mr-2 h-4 w-4" />
                Create Maintenance Request
              </Button>
              <Button className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="maintenance">
            <TabsList className="mb-4">
              <TabsTrigger value="maintenance">
                Maintenance Requests
              </TabsTrigger>
              <TabsTrigger value="payments">
                Payment History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="maintenance">
              <Card>
                <CardContent className="pt-6">
                  {tenantMaintenance.length > 0 ? (
                    <div className="space-y-4">
                      {tenantMaintenance.map((request) => (
                        <div 
                          key={request.id} 
                          className="flex items-center gap-4 p-4 border rounded-md hover:bg-accent transition-colors"
                        >
                          <div className="flex-1">
                            <Link 
                              to={`/maintenance/${request.id}`}
                              className="font-medium hover:text-caitanya-purple transition-colors"
                            >
                              {request.title}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {request.propertyName} • Reported on {new Date(request.dateReported).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge 
                            className={
                              request.status === "open" 
                                ? "bg-red-100 text-red-800" 
                                : request.status === "in progress" 
                                ? "bg-amber-100 text-amber-800" 
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Wrench className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium mb-1">No Maintenance Requests</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        This tenant hasn't submitted any maintenance requests.
                      </p>
                      <Button variant="outline">Create Request</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardContent className="pt-6">
                  {tenantPayments.length > 0 ? (
                    <div className="space-y-4">
                      {tenantPayments.map((payment) => (
                        <div 
                          key={payment.id} 
                          className="flex items-center gap-4 p-4 border rounded-md hover:bg-accent transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-medium">
                              Rent Payment for {new Date(payment.date).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {payment.propertyName} • {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)} Payment
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${payment.amount.toLocaleString()}</div>
                            <Badge 
                              className={
                                payment.status === "paid" 
                                  ? "bg-green-100 text-green-800" 
                                  : payment.status === "pending" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <DollarSign className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium mb-1">No Payment History</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        There are no recorded payments for this tenant.
                      </p>
                      <Button variant="outline">Record Payment</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default TenantDetail;
