'use server'

import { z } from 'zod';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import { registerSchema } from '@/lib/schemas/auth';

export async function registerUser(formData: z.infer<typeof registerSchema>) {
    const validatedFields = registerSchema.safeParse(formData);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { name, email, password, role, mobileNo, course } = validatedFields.data;

    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { error: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            mobileNo,
            course,
        });

        await newUser.save();

        return { success: 'User registered successfully' };
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Something went wrong' };
    }
}
