'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { updateApplicationStatus } from '@/actions/application';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';

export default function AdminApplications({ applications }: { applications: any[] }) {
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [remarks, setRemarks] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleAction = async (status: string) => {
        if (!selectedApp) return;
        const result = await updateApplicationStatus(selectedApp._id, status, remarks);
        if (result.success) {
            toast.success(`Application ${status}`);
            setIsOpen(false);
            setRemarks('');
            router.refresh();
        } else {
            toast.error('Failed to update status');
        }
    };

    const openActionDialog = (app: any) => {
        setSelectedApp(app);
        setRemarks(app.remarks || '');
        setIsOpen(true);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Review Applications</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Scholarship</TableHead>
                            <TableHead>Applied At</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No applications found.</TableCell>
                            </TableRow>
                        ) : (
                            applications.map((app) => (
                                <TableRow key={app._id}>
                                    <TableCell>
                                        <div className="font-medium">{app.studentId?.name || 'Unknown'}</div>
                                        <div className="text-xs text-muted-foreground">{app.studentId?.email}</div>
                                    </TableCell>
                                    <TableCell>{app.scholarshipId?.name || 'Unknown'}</TableCell>
                                    <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => openActionDialog(app)}>
                                            Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Review Application</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{selectedApp?.scholarshipId?.name}</h4>
                            <p className="text-sm text-muted-foreground">Applicant: {selectedApp?.studentId?.name}</p>
                            <div className="mt-2">
                                <a href={selectedApp?.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                                    View Submitted Document
                                </a>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Remarks</label>
                            <Textarea
                                value={remarks}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRemarks(e.target.value)}
                                placeholder="Add remarks for approval or rejection..."
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="destructive" onClick={() => handleAction('Rejected')}>Reject</Button>
                        <Button onClick={() => handleAction('Approved')}>Approve</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
