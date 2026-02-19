import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
            Your Future Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Apply for scholarships, track your status, and achieve your dreams with our centralized paperless portal.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="font-semibold px-8 py-6 text-lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/scholarships">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-6 text-lg">
                Browse Scholarships
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Use ScholarshipPortal?</h2>
            <p className="mt-4 text-lg text-gray-600">Simplifying the scholarship application process for everyone.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-1">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Application</h3>
              <p className="text-gray-600">Apply to multiple scholarships with a single profile. No more repetitive paperwork.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-1">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">Track your application status in real-time. outcomes notified instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md transition-transform hover:-translate-y-1">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Digital</h3>
              <p className="text-gray-600">Your data is secure. Upload documents digitally and track everything online.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
