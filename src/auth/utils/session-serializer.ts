import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: (error, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (error, user: User) => void) {
    const userDB = await this.userRepository.findOne({
      where: { id: user.id },
    });
    return userDB ? done(null, userDB) : done(null, null);
  }
}
