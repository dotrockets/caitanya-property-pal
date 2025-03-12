
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash, ArrowLeft, User, Wrench, Building } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { properties, tenants, maintenanceRequests } from "@/services/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const statusColors = {
  vacant: "bg-green-100 text-green-800 hover:bg-green-200",
  occupied: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  maintenance: "bg-amber-100 text-amber-800 hover:bg-amber-200",
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The property you are looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Filter tenants and maintenance requests for this property
  const propertyTenants = tenants.filter((t) => t.propertyId === property.id);
  const propertyMaintenance = maintenanceRequests.filter((m) => m.propertyId === property.id);

  return (
    <MainLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{property.name}</h1>
            <p className="text-muted-foreground">
              {property.address}, {property.city}, {property.state} {property.zip}
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${property.image})` }}
            ></div>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[property.status]}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                  <div className="font-semibold">${property.rent.toLocaleString()}/mo</div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{property.type}</span>
                  </div>
                  <div>{property.bedrooms} Beds</div>
                  <div>{property.bathrooms} Baths</div>
                  <div>{property.sqft.toLocaleString()} sqft</div>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="tenants">
                    Tenants ({propertyTenants.length})
                  </TabsTrigger>
                  <TabsTrigger value="maintenance">
                    Maintenance ({propertyMaintenance.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{property.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tenants">
                  {propertyTenants.length > 0 ? (
                    <div className="space-y-4">
                      {propertyTenants.map((tenant) => (
                        <div 
                          key={tenant.id} 
                          className="flex items-center gap-4 p-4 border rounded-md hover:bg-accent transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={tenant.image} alt={tenant.name} />
                            <AvatarFallback>{tenant.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/tenants/${tenant.id}`}
                              className="font-medium hover:text-caitanya-purple transition-colors"
                            >
                              {tenant.name}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              Lease: {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="font-medium">
                            ${tenant.rentAmount.toLocaleString()}/mo
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <User className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium mb-1">No Tenants</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        This property currently doesn't have any tenants.
                      </p>
                      <Button variant="outline">Add Tenant</Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="maintenance">
                  {propertyMaintenance.length > 0 ? (
                    <div className="space-y-4">
                      {propertyMaintenance.map((request) => (
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
                              Reported by {request.tenantName} on {new Date(request.dateReported).toLocaleDateString()}
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
                        This property doesn't have any maintenance requests.
                      </p>
                      <Button variant="outline">Add Request</Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Rent</span>
                  <span className="font-medium">${property.rent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Annual Revenue</span>
                  <span className="font-medium">${(property.rent * 12).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Occupancy Status</span>
                  <Badge className={statusColors[property.status]}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
              <Button className="w-full justify-start">
                <Wrench className="mr-2 h-4 w-4" />
                Create Maintenance Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertyDetail;
