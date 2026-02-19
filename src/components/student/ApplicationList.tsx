'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deleteApplication, updateApplication } from '@/actions/application';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ApplicationList({ applications }: { applications: any[] }) {
    const [editingApp, setEditingApp] = useState<any>(null);
    const [documentUrl, setDocumentUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter();

    const handleEditClick = (app: any) => {
        setEditingApp(app);
        setDocumentUrl(app.documentUrl);
        setIsEditOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingApp) return;
        setLoading(true);
        try {
            const result = await updateApplication(editingApp._id, documentUrl);
            if (result.success) {
                toast.success('Application updated successfully');
                setIsEditOpen(false);
                router.refresh();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Failed to update application');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;

        try {
            const result = await deleteApplication(id);
            if (result.success) {
                toast.success('Application deleted successfully');
                router.refresh();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Failed to delete application');
        }
    };

    if (applications.length === 0) {
        return (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg mb-4">You haven't applied for any scholarships yet.</p>
                <a href="/scholarships">
                    <Button variant="outline">Browse Available Scholarships</Button>
                </a>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
                <Card key={app._id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg line-clamp-1" title={app.scholarshipId?.name}>
                            {app.scholarshipId?.name || 'Unknown Scholarship'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">Status:</span>
                            <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                {app.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>

                        {app.remarks && (
                            <div className="bg-yellow-50 p-2 rounded text-sm mb-4 border border-yellow-100">
                                <strong>Remarks:</strong> {app.remarks}
                            </div>
                        )}

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <a
                                href={app.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium"
                            >
                                <ExternalLink size={14} /> View Doc
                            </a>

                            {app.status === 'Pending' && (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(app)} title="Edit Application">
                                        <Pencil className="h-4 w-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(app._id)} title="Delete Application">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Application</DialogTitle>
                        <DialogDescription>
                            Update your application document. You can only edit applications that are still pending.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="doc-url" className="text-right">
                                Document URL
                            </Label>
                            <Input
                                id="doc-url"
                                value={documentUrl}
                                onChange={(e) => setDocumentUrl(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdate} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Application'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
