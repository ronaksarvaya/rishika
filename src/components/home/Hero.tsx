'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Hero() {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';

    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
                    Your Future Starts Here
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
                    Apply for scholarships, track your status, and achieve your dreams with our centralized paperless portal.
                </p>
                <div className="flex justify-center space-x-4 min-h-[60px]">
                    {isLoading ? (
                        <div className="flex items-center space-x-2">
                            <Loader2 className="h-8 w-8 animate-spin text-white opacity-80" />
                        </div>
                    ) : session ? (
                        <div className="flex gap-4 animate-in fade-in zoom-in duration-300">
                            {session.user.role === 'ADMIN' ? (
                                <>
                                    <Link href="/admin/dashboard">
                                        <Button size="lg" variant="secondary" className="font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                                            Admin Dashboard
                                        </Button>
                                    </Link>
                                    <Link href="/admin/dashboard">
                                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-6 text-lg">
                                            Manage Scholarships
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/student/dashboard">
                                        <Button size="lg" variant="secondary" className="font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                    <Link href="/student/dashboard">
                                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-6 text-lg">
                                            My Applications
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-4 animate-in fade-in zoom-in duration-300">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/scholarships">
                                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-6 text-lg">
                                    Browse Scholarships
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
