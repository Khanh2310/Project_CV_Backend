import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/services';
import { IUser } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Khi chúng ta login thì nó sẽ chạy vào hàm này. Và trả về cho chúng ta username và pass
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid == true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      // sub nội dung của token
      iss: 'from server',
      //iss: người tạo ra token này
      _id,
      name,
      email,
      role,
    };

    const refresh_token = this.createRefreshToken(payload);

    // update user with refresh token
    await this.usersService.updateRefreshToken(refresh_token, _id);

    // set refresh token as cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRESIN'),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  }

  async register(user: RegisterUserDto) {
    const newUser = await this.usersService.register(user);

    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  createRefreshToken(payload) {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRESIN'),
    });

    return refresh_token;
  }

  async processRefreshToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findUserByRefreshToken(refreshToken);

      if (user) {
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token refresh_token',
          // sub nội dung của token
          iss: 'from server',
          //iss: người tạo ra token này
          _id,
          name,
          email,
          role,
        };
        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updateRefreshToken(
          refresh_token,
          _id.toString(),
        );

        response.clearCookie('refresh_token');
        // set refresh token as cookie
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRESIN'),
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role,
          },
        };
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
