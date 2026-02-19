import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <Hero />

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
