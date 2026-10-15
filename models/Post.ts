
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    topics: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: false,
    },

    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({
  published: 1,
  createdAt: -1,
});

postSchema.index({
  community: 1,
  published: 1,
  createdAt: -1,
});

postSchema.index({
  topics: 1,
  published: 1,
  createdAt: -1,
});

postSchema.index({
  published: 1,
  title: 1,
});

const Post =
  mongoose.models.Post ||
  mongoose.model("Post", postSchema);

export default Post;
