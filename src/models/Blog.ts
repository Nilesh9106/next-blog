import mongoose, { Model } from "mongoose";

export interface IBlog {
    title: string;
    content: string;
    description: string;
    image?: string;
    slug: string;
    likedBy: string[];
    keywords: string[];
    comments: object[];
    createdAt?: string;
    updatedAt?: string;
}

const BlogSchema = new mongoose.Schema<IBlog, Model<IBlog>>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    keywords: [
        {
            type: String,
        }
    ],
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {
            type: Object,
        }
    ],
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;