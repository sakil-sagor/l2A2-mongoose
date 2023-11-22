import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
  },
  username: {
    type: String,
    required: [true, 'username id is required'],
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      //   required: [true, 'Name is required'],
      //   validate: {
      //     validator: function (value: string) {
      //       const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      //       return firstNameStr === value;
      //     },
      //     message: '{VALUE} is not in capitalization format',
      //   },
    },
    lastName: {
      type: String,
    },
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

// userSchema.pre('findOneAndUpdate', async function() {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
// });

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<User>('User', userSchema);
