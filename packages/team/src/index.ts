import { Module } from '@nestjs/common';
import { MemberService } from './application/services/member.service';
import { PrismaMemberRepository } from './infrastructure/repositories/prisma-member.repository';
import { MemberRepository } from './domain/repositories/member.repository';
export * from './application/services/member.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: MemberRepository,
      useFactory: () => {
        return new PrismaMemberRepository();;
      },
    },
    {
      provide: MemberService,
      inject: [MemberRepository],
      useFactory: (memberRepository: MemberRepository) => {
        const service = new MemberService(memberRepository);
        return service;
      },
    },
  ],
  exports: [MemberService],
})
export class TeamModule {} 