import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
  [key: string]: any;
  institution: string;
  email: string;
  passwordhash: string;
  createdAt: Date;
  phone: string;
  address: string;
  "image(s)": string[];
  permissions: {
    [key: string]: boolean | undefined;
    allow_user_create: boolean | undefined;
    allow_user_login: boolean | undefined;
    allow_user_edit: boolean | undefined;
    allow_user_delete: boolean | undefined;
    allow_user_schedule: boolean | undefined;
    allow_class_create: boolean | undefined;
    allow_class_edit: boolean | undefined;
    allow_class_delete: boolean | undefined;
    allow_class_schedule: boolean | undefined;
    allow_quiz_create: boolean | undefined;
    allow_quiz_edit: boolean | undefined;
    allow_quiz_delete: boolean | undefined;
    allow_question_create: boolean | undefined;
    allow_question_edit: boolean | undefined;
    allow_question_delete: boolean | undefined; 
  },
  status: number;
};

const defaultPermission = {
  type: Boolean || undefined
}

const adminSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  passwordhash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    // enum: 10,
  },
  address: {
    type: String,
    // minlength: 6,
  },
  "image(s)": [
    {
      type: String,
    }
  ],
  permissions: {} || {
    allow_user_create: defaultPermission,
    allow_user_login: defaultPermission,
    allow_user_edit: defaultPermission,
    allow_user_delete: defaultPermission,
    allow_user_schedule: defaultPermission,
    allow_class_create: defaultPermission,
    allow_class_edit: defaultPermission,
    allow_class_delete: defaultPermission,
    allow_class_schedule: defaultPermission,
    allow_quiz_create: defaultPermission,
    allow_quiz_edit: defaultPermission,
    allow_quiz_delete: defaultPermission,
    allow_question_create: defaultPermission,
    allow_question_edit: defaultPermission,
    allow_question_delete: defaultPermission
  },
  status: {
    type: Number,
    default: 0
  }
});

const Admin = mongoose.model<IAdmin>("admin", adminSchema);

export default Admin;