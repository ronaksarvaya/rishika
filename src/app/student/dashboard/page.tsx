import { getMyApplications } from '@/actions/application';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ApplicationList from '@/components/student/ApplicationList';

export const dynamic = 'force-dynamic';

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'STUDENT') {
        redirect('/login');
    }

    const { applications, error } = await getMyApplications();

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Applications</h1>
                <Link href="/scholarships">
                    <Button>Browse Scholarships</Button>
                </Link>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <ApplicationList applications={applications || []} />
        </div>
    );
}
