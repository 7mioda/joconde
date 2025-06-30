# Team Module

This module manages team members in the application.

## Features

- Create, read, update, and delete team members
- Search members by name
- Avatar management
- Automatic name generation from firstname and lastname

## Entity: Member

Each member has the following properties:

- `id`: Unique identifier (auto-generated)
- `firstname`: Member's first name
- `lastname`: Member's last name
- `name`: Computed full name (firstname + lastname)
- `avatar`: Optional avatar URL
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Usage

```typescript
import { TeamModule, MemberService } from '@server/team';

// In your NestJS module
@Module({
  imports: [TeamModule],
  // ...
})
export class AppModule {}

// In your service
@Injectable()
export class MyService {
  constructor(private memberService: MemberService) {}

  async createMember() {
    return this.memberService.createMember({
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg'
    });
  }
}
```

## Database Setup

1. Generate Prisma client:
   ```bash
   npm run db:generate
   ```

2. Push schema to database:
   ```bash
   npm run db:push
   ```

3. Run migrations (if needed):
   ```bash
   npm run db:migrate
   ```

4. Seed with sample data:
   ```bash
   npm run db:seed
   ```

## Development

- `npm run dev`: Watch mode for TypeScript compilation
- `npm run build`: Build the module
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Push schema changes to database
- `npm run db:migrate`: Run database migrations
- `npm run db:seed`: Seed database with sample data 