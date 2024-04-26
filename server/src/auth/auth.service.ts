import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly DEFAULT_USER_ID = this.configService.get('DEFAULT_USER_ID');

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  login(userId: string): { accessToken: string } {
    if (userId !== this.DEFAULT_USER_ID) throw new UnauthorizedException();

    const accessToken = this.jwtService.sign({ sub: userId });

    return { accessToken };
  }
}
