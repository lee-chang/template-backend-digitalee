import { IUser } from '../../interfaces/user.interface'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'

import { phoneSchema } from '../../../shared/repositories/mongoose/phone.model'
import { addressSchema } from '../../../shared/repositories/mongoose/address.model'


const UserSchema: Schema = new Schema<IUser & {_id:string}>(
  {
    _id: {
      type:String
    },
    id: {
      type: String,
      unique: true,
      key: true      
    },
    identificationType: {
      type: String,
      trim: true,
    },
    identification: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: [
      {
        type: String,
        ref: 'Role',
      },
    ],
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: [
      {
        type: phoneSchema,
      },
    ],
    address: [
      {
        type: addressSchema,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    login_code: {
      type: String,
      trim: true,
    },
    recovery_code: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date
    },
    birthDate: {
      type: Date
    },

  },
  {
    id: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      },
    },
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

const UserModel = model<IUser>('User', UserSchema)
export default UserModel
