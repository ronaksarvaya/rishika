'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { applyForScholarship } from '@/actions/application';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ScholarshipApplyButton({ scholarship }: { scholarship: any }) {
    const [open, setOpen] = useState(false);
    const [documentUrl, setDocumentUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleApply = async () => {
        if (!documentUrl) {
            toast.error('Please provide a document URL');
            return;
        }

        setLoading(true);
        try {
            const result = await applyForScholarship(scholarship._id, documentUrl);
            if (result.success) {
                toast.success('Application submitted successfully!');
                setOpen(false);
                setDocumentUrl('');
                router.refresh();
                router.push('/student/dashboard');
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Apply Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apply for {scholarship.name}</DialogTitle>
                    <DialogDescription>
                        Submit your application details below.
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
                            placeholder="https://drive.google.com/..."
                            className="col-span-3"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground ml-auto col-span-4 text-center">
                        Please provide a public link to your resume/transcripts (Google Drive, Dropbox, etc.)
                    </p>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleApply} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
