'use server'

import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import Scholarship from '@/lib/models/Scholarship';
import { scholarshipSchema } from '@/lib/schemas/scholarship';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createScholarship(formData: z.infer<typeof scholarshipSchema>) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return { error: 'Unauthorized' };
    }

    const validatedFields = scholarshipSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    try {
        await connectToDatabase();
        await Scholarship.create(validatedFields.data);
        revalidatePath('/scholarships');
        revalidatePath('/admin/dashboard');
        return { success: 'Scholarship created successfully' };
    } catch (error) {
        console.error('Create scholarship error:', error);
        return { error: 'Something went wrong' };
    }
}

export async function getAllScholarships() {
    try {
        await connectToDatabase();
        const scholarships = await Scholarship.find({}).sort({ createdAt: -1 });
        return { scholarships: JSON.parse(JSON.stringify(scholarships)) };
    } catch (error) {
        return { error: 'Failed to fetch scholarships' };
    }
}

export async function deleteScholarship(id: string) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return { error: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        await Scholarship.findByIdAndDelete(id);
        revalidatePath('/scholarships');
        revalidatePath('/admin/dashboard');
        return { success: 'Scholarship deleted successfully' };
    } catch (error) {
        return { error: 'Failed to delete scholarship' };
    }
}
