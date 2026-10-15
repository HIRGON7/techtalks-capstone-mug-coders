import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

membershipSchema.index(
  { user: 1, community: 1 },
  { unique: true }
);

const Membership =
  mongoose.models.Membership ||
  mongoose.model("Membership", membershipSchema);

export default Membership;