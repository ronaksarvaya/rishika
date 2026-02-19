import mongoose, { Schema, model, models } from 'mongoose';

const ApplicationSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scholarshipId: { type: Schema.Types.ObjectId, ref: 'Scholarship', required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    remarks: { type: String },
    documentUrl: { type: String, required: true }, // URL to uploaded document
    appliedAt: { type: Date, default: Date.now },
});

// Prevent duplicate applications for the same scholarship by the same student
ApplicationSchema.index({ studentId: 1, scholarshipId: 1 }, { unique: true });

const Application = models.Application || model('Application', ApplicationSchema);

export default Application;
