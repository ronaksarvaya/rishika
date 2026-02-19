import mongoose, { Schema, model, models } from 'mongoose';

const ScholarshipSchema = new Schema({
    name: { type: String, required: true },
    provider: { type: String, required: true },
    eligibility: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Merit, Needs-based
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Scholarship = models.Scholarship || model('Scholarship', ScholarshipSchema);

export default Scholarship;
