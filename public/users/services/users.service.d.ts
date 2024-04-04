/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Model } from 'mongoose';
import { User } from '../schemas';
import { CreateUserDto, UpdateUserDto } from '../dto';
export declare class UsersService {
    private UserModel;
    constructor(UserModel: Model<User>);
    getHashPassword: (Hashpassword: string) => string;
    create(addUser: CreateUserDto): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<mongoose.UpdateWriteOpResult>;
    findOneByUserName(username: string): mongoose.Query<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }, {}, User, "findOne">;
    isValidPassword(password: string, hash: string): boolean;
    remove(id: string): "user not found" | mongoose.Query<mongoose.mongo.DeleteResult, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }, {}, User, "deleteOne">;
}
