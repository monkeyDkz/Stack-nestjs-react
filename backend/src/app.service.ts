import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  usersRepository: any;
  getHello(): string {
    return 'Hello World!';
  }
  async findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
  
}
