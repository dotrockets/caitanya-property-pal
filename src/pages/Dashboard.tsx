
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { PropertyList } from "@/components/dashboard/PropertyList";
import { MaintenanceList } from "@/components/dashboard/MaintenanceList";
import { House, Users, Wrench, DollarSign } from "lucide-react";
import { properties, tenants, maintenanceRequests, payments } from "@/services/mockData";

const Dashboard = () => {
  // Calculate statistics
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status === 'occupied').length;
  const vacantProperties = properties.filter(p => p.status === 'vacant').length;
  const occupancyRate = totalProperties ? Math.round((occupiedProperties / totalProperties) * 100) : 0;
  
  const totalTenants = tenants.length;
  
  const openRequests = maintenanceRequests.filter(m => m.status === 'open').length;
  
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const overduePayments = payments.filter(p => p.status === 'overdue').length;
  
  // Get recent properties and maintenance requests
  const recentProperties = [...properties].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
  const recentRequests = [...maintenanceRequests].sort((a, b) => 
    new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime()
  ).slice(0, 5);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Caitanya Property Management</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Properties" 
          value={totalProperties} 
          icon={House} 
          description={`${occupancyRate}% Occupancy Rate`}
          color="purple"
        />
        <StatCard 
          title="Total Tenants" 
          value={totalTenants} 
          icon={Users} 
          color="blue"
        />
        <StatCard 
          title="Maintenance Requests" 
          value={openRequests} 
          icon={Wrench} 
          description="Open requests"
          color="amber"
        />
        <StatCard 
          title="Upcoming Payments" 
          value={pendingPayments + overduePayments} 
          icon={DollarSign} 
          description={`${overduePayments} overdue`}
          color="green"
        />
      </div>
      
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <PropertyList properties={recentProperties} />
        <MaintenanceList requests={recentRequests} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
