
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { tenants } from "@/services/mockData";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground">
            Manage your tenants and their lease information
          </p>
        </div>
        <Button asChild>
          <Link to="/tenants/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tenants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Lease Period</TableHead>
              <TableHead className="text-right">Rent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Link 
                    to={`/tenants/${tenant.id}`}
                    className="flex items-center gap-2 hover:text-caitanya-purple transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={tenant.image} alt={tenant.name} />
                      <AvatarFallback>{tenant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{tenant.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>
                  <Link 
                    to={`/properties/${tenant.propertyId}`}
                    className="hover:text-caitanya-purple transition-colors"
                  >
                    {tenant.propertyName}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  ${tenant.rentAmount.toLocaleString()}/mo
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Tenants;
