'use server'

import connectToDatabase from '@/lib/db';
import Application from '@/lib/models/Application';
import Scholarship from '@/lib/models/Scholarship';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function applyForScholarship(scholarshipId: string, documentUrl: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'STUDENT') {
        return { error: 'Unauthorized' };
    }

    if (!documentUrl) {
        return { error: 'Document URL is required' };
    }

    try {
        await connectToDatabase();

        // Check for existing application
        const existing = await Application.findOne({
            studentId: session.user.id,
            scholarshipId,
        });

        if (existing) {
            return { error: 'You have already applied for this scholarship' };
        }

        await Application.create({
            studentId: session.user.id,
            scholarshipId,
            documentUrl,
            status: 'Pending',
        });

        revalidatePath('/student/dashboard');
        return { success: 'Application submitted successfully' };
    } catch (error) {
        console.error('Application error:', error);
        return { error: 'Something went wrong' };
    }
}

export async function getMyApplications() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'STUDENT') {
        return { error: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        // Populate scholarship details
        const applications = await Application.find({ studentId: session.user.id })
            .populate('scholarshipId')
            .sort({ appliedAt: -1 });

        return { applications: JSON.parse(JSON.stringify(applications)) };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch applications' };
    }
}

export async function getAllApplications() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return { error: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        const applications = await Application.find({})
            .populate('scholarshipId')
            .populate('studentId', 'name email mobileNo course')
            .sort({ appliedAt: -1 });
        return { applications: JSON.parse(JSON.stringify(applications)) };
    } catch (error) {
        return { error: 'Failed to fetch applications' };
    }
}

export async function updateApplicationStatus(id: string, status: string, remarks?: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return { error: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        await Application.findByIdAndUpdate(id, { status, remarks });
        revalidatePath('/admin/dashboard');
        revalidatePath('/student/dashboard');
        return { success: 'Application status updated' };
    } catch (error) {
        return { error: 'Failed to update application' };
    }
}

export async function deleteApplication(id: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'STUDENT') {
        return { error: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        const application = await Application.findOne({ _id: id, studentId: session.user.id });

        if (!application) {
            return { error: 'Application not found' };
        }

        if (application.status !== 'Pending') {
            return { error: 'Cannot delete processed application' };
        }

        await Application.findByIdAndDelete(id);
        revalidatePath('/student/dashboard');
        return { success: 'Application deleted successfully' };
    } catch (error) {
        return { error: 'Failed to delete application' };
    }
}

export async function updateApplication(id: string, documentUrl: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'STUDENT') {
        return { error: 'Unauthorized' };
    }

    if (!documentUrl) {
        return { error: 'Document URL is required' };
    }

    try {
        await connectToDatabase();
        const application = await Application.findOne({ _id: id, studentId: session.user.id });

        if (!application) {
            return { error: 'Application not found' };
        }

        if (application.status !== 'Pending') {
            return { error: 'Cannot update processed application' };
        }

        await Application.findByIdAndUpdate(id, { documentUrl });
        revalidatePath('/student/dashboard');
        return { success: 'Application updated successfully' };
    } catch (error) {
        return { error: 'Failed to update application' };
    }
}
