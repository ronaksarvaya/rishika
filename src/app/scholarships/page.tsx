import { getAllScholarships } from '@/actions/scholarship';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ScholarshipApplyButton from '../../components/scholarship/ScholarshipApplyButton'; // Component to handle application logic
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function ScholarshipsPage() {
    const { scholarships } = await getAllScholarships();
    const session = await getServerSession(authOptions);
    const isStudent = session?.user.role === 'STUDENT';

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Available Scholarships</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {scholarships?.map((scholarship: any) => (
                    <Card key={scholarship._id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl mb-2">{scholarship.name}</CardTitle>
                                    <CardDescription>{scholarship.provider}</CardDescription>
                                </div>
                                <Badge>{scholarship.category}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-semibold text-green-600">${scholarship.amount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Deadline:</span>
                                    <span className="font-medium text-red-500">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{scholarship.description}</p>
                            <div className="text-xs bg-gray-50 p-2 rounded">
                                <span className="font-semibold">Eligibility:</span> {scholarship.eligibility}
                            </div>
                        </CardContent>
                        <CardFooter>
                            {isStudent ? (
                                <ScholarshipApplyButton scholarship={scholarship} />
                            ) : !session ? (
                                <Link href="/login" className="w-full">
                                    <Button className="w-full">Login to Apply</Button>
                                </Link>
                            ) : (
                                <Button disabled className="w-full" variant="secondary">Student Only</Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}

                {scholarships?.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No scholarships available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
