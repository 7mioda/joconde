import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        introspection: true,
        debug: true,
        playground: false,
        subscriptions: {
          'graphql-ws': true,
        },
        context: ({ req, res }) => ({
          request: req,
          response: res,
        }),
        cors: {
          credentials: true,
          origin: config.get('cors.origin'),
        },
        autoSchemaFile: './schema.gql',
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }),
    }),
    TasksModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
