import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('user not found.');
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, attrs);
      return this.repo.save(user);
    }
    throw new NotFoundException('user not found.');
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (user) {
      return this.repo.remove(user);
    }
    throw new NotFoundException('user not found.');
  }
}
