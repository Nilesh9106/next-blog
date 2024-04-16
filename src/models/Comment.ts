import mongoose from "mongoose";
import "./User";

interface IComment extends mongoose.Document {
  content: string;
  user: mongoose.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment: mongoose.Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
