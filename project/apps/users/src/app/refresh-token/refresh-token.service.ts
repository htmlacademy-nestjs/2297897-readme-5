import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { jwtConfig } from '@project/libs/shared/config/users';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@project/libs/shared/types';
import { parseTime } from '@project/libs/shared/helpers';
import { RefreshTokenEntity } from './refresh-token.entity';
import dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ){ }

    public async createRefreshSession(payload: RefreshTokenPayload) {
      const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
      const refreshToken = RefreshTokenEntity.fromObject({
        tokenId: payload.tokenId,
        createdAt: new Date(),
        userId: payload.sub,
        expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
      });

      return this.refreshTokenRepository.save(refreshToken);
    }

    public async deleteRefreshSession(tokenId: string) {
      await this.deleteExpiredRefreshTokens();
      return this.refreshTokenRepository.deleteByTokenId(tokenId)
    }

    public async isExists(tokenId: string): Promise<boolean> {
      const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
      return (refreshToken !== null);
    }

    public async deleteExpiredRefreshTokens() {
      return this.refreshTokenRepository.deleteExpiredTokens();
    }
}
