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
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { IUser } from 'src/users/types';
import { Jobs, JobsDocument } from '../schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
export declare class JobsService {
    private jobsModel;
    constructor(jobsModel: SoftDeleteModel<JobsDocument>);
    create(createJobDto: CreateJobDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            currentPage: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Jobs> & Jobs & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Jobs> & Jobs & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Jobs> & Jobs & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Jobs> & Jobs & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | "Jobs Not Found">;
    update(id: string, updateJobDto: UpdateJobDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}