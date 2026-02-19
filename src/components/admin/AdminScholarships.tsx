'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { deleteScholarship } from '@/actions/scholarship';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import ScholarshipForm from './ScholarshipForm';
import { useRouter } from 'next/navigation';

export default function AdminScholarships({ scholarships }: { scholarships: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this scholarship?')) return;
        const result = await deleteScholarship(id);
        if (result.success) {
            toast.success('Scholarship deleted');
            router.refresh();
        } else {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Manage Scholarships</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Scholarship</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Scholarship</DialogTitle>
                        </DialogHeader>
                        <ScholarshipForm onSuccess={() => setIsOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scholarships.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No scholarships found.</TableCell>
                            </TableRow>
                        ) : (
                            scholarships.map((scholarship) => (
                                <TableRow key={scholarship._id}>
                                    <TableCell className="font-medium">{scholarship.name}</TableCell>
                                    <TableCell>{scholarship.provider}</TableCell>
                                    <TableCell>${scholarship.amount?.toLocaleString()}</TableCell>
                                    <TableCell>{new Date(scholarship.deadline).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(scholarship._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
