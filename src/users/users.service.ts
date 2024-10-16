import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const { email } = createUserDto;
      const existingUser = await this.userRepository.findOneBy({ email })
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
      throw new InternalServerErrorException('Failed to create user. ' + error.message)
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.find();
      if (!users) throw new NotFoundException('Failed to find users')
      return users.map(user => ({
        id: user.id,
        nickName: user.nickName,
        name: user.name,
        age: user.age,
        email: user.email,
        role: user.role,
      }))
    } catch (error) {
      throw new InternalServerErrorException('Failed to find users. ' + error.message)
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Failed to find user')
      return {
        id: user.id,
        nickName: user.nickName,
        name: user.name,
        age: user.age,
        email: user.email,
        role: user.role,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user. ' + error.message)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Failed to find user')
      Object.assign(user, updateUserDto);
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        user.password = hashedPassword;
      }
      await this.userRepository.save(user);
      return {
        id: user.id,
        nickName: user.nickName,
        name: user.name,
        age: user.age,
        email: user.email,
        role: user.role,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user. ' + error.message)
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Failed to find user')
      await this.userRepository.remove(user);
      return `User with id ${id} has been deleted.`
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user. ' + error.message)  
    }
  }
}
