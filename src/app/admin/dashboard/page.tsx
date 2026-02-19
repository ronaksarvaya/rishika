import { getAllScholarships } from '@/actions/scholarship';
import { getAllApplications } from '@/actions/application';
import AdminScholarships from '@/components/admin/AdminScholarships';
import AdminApplications from '@/components/admin/AdminApplications';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/login');
    }

    const { scholarships } = await getAllScholarships();
    const { applications } = await getAllApplications();

    const totalScholarships = scholarships?.length || 0;
    const totalApplications = applications?.length || 0;
    const pendingApplications = applications?.filter((a: any) => a.status === 'Pending').length || 0;
    const approvedApplications = applications?.filter((a: any) => a.status === 'Approved').length || 0;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                {/* CSV Export could be implemented here */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalScholarships}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApplications}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{pendingApplications}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{approvedApplications}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="scholarships" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="scholarships">Manage Scholarships</TabsTrigger>
                    <TabsTrigger value="applications">Review Applications</TabsTrigger>
                </TabsList>
                <TabsContent value="scholarships" className="space-y-4">
                    <AdminScholarships scholarships={scholarships || []} />
                </TabsContent>
                <TabsContent value="applications" className="space-y-4">
                    <AdminApplications applications={applications || []} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
