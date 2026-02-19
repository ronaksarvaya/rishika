'use client'

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea'; // need textarea
import { scholarshipSchema } from '@/lib/schemas/scholarship';
import { createScholarship } from '@/actions/scholarship';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ScholarshipForm({ onSuccess }: { onSuccess: () => void }) {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(scholarshipSchema),
        defaultValues: {
            name: '',
            provider: '',
            amount: 0,
            deadline: '',
            eligibility: '',
            category: '',
            description: '',
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof scholarshipSchema>) {
        setIsLoading(true);
        try {
            const result = await createScholarship(values);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Scholarship created successfully');
                form.reset();
                onSuccess();
                router.refresh();
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scholarship Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Engineering Merit Scholarship" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Provider</FormLabel>
                                <FormControl>
                                    <Input placeholder="Foundation X" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} value={field.value as number} onChange={(e) => field.onChange(e.target.valueAsNumber)} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deadline</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} value={field.value as string} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Merit-based" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="eligibility"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Eligibility</FormLabel>
                                <FormControl>
                                    <Input placeholder="GPA > 3.5" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Details about specific requirements..." className="min-h-[100px]" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        'Create Scholarship'
                    )}
                </Button>
            </form>
        </Form>
    );
}
