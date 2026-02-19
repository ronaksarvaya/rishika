import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        create a new account
                    </Link>
                </p>
            </div>
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <LoginForm />
            </div>
        </div>
    );
}
