import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './interfaces/user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const {email} = createUserDto;
      const existingUser = await this.userRepository.findOneBy({email})
      if (existingUser) {
        throw new BadRequestException(`User with email ${email} already exists.`);
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
      await this.userRepository.save(newUser);
      return {
        id: newUser.id,
        nickName: newUser.nickName,
        name: newUser.name,
        age: newUser.age,
        email: newUser.email,
        role: newUser.role,
      }
    } catch (error) {
      throw new BadRequestException('Failed to create user. '+ error.message)
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
