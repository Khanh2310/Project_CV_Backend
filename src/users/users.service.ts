/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  getHashPassword = (Hashpassword: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(Hashpassword, salt);
    return hash;
  };

  // No DTO
  // async create(email: string, password: string, name: string) {
  //   const hash = this.getHashPassword(password);
  //   const user = await this.UserModel.create({
  //     email,
  //     password: hash,
  //     name,
  //   });
  //   return user;
  // }

  // DTO

  async create(addUser: CreateUserDto) {
    const hash = this.getHashPassword(addUser.password);
    const user = await this.UserModel.create({
      email: addUser.email,
      password: hash,
      name: addUser.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        ...updateUserDto,
      },
    );
  }
  findOneByUserName(username: string) {
    return this.UserModel.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'user not found';

    return this.UserModel.deleteOne({
      _id: id,
    });
  }
}
