import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePremiumDto } from './dto/update-premium.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updatePremium(id: string, dto: UpdatePremiumDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.hasPremium = dto.hasPremium;

    if (dto.hasPremium && dto.durationDays) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + dto.durationDays);
      user.premiumExpiresAt = expirationDate;
    } else if (!dto.hasPremium) {
      user.premiumExpiresAt = null as any;
    }

    return await this.userRepository.save(user);
  }

  async getPremiumUsers() {
    const users = await this.userRepository.find({
      where: { hasPremium: true },
      relations: ['testResults'],
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.fullName,
      email: user.email,
      plan: user.premiumPlan === 'annual' ? 'Annual' : 'Monthly',
      premiumSince: user.premiumExpiresAt
        ? user.premiumExpiresAt.toISOString().split('T')[0]
        : null,
      testsCompleted: user.testResults?.length || 0,
      status: user.isActive ? 'Active' : 'Inactive',
    }));
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['testResults'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getAllUser() {
    return await this.userRepository.find({
      relations: ['testResults'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(createUserDto: Partial<User>) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
    return { message: `User with ID ${id} has been removed` };
  }
}
