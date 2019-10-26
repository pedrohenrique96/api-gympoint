import { Schema, model } from 'mongoose';

const CheckinSchema = new Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Checkin', CheckinSchema);
