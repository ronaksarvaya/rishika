import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import UserMenu from './UserMenu';
import { GraduationCap } from 'lucide-react';

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
                            <GraduationCap className="h-8 w-8" />
                            <span>ScholarshipPortal</span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link href="/scholarships" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-colors">
                                Scholarships
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {session && session.user ? (
                            <UserMenu user={session.user as any} />
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Register</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
