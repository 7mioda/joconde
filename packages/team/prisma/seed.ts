import { PrismaClient } from './types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding F1 drivers...');

  // Create sample F1 drivers
  const drivers = [
    {
      firstname: 'Max',
      lastname: 'Verstappen',
      email: 'max.verstappen@redbull.com',
      avatar: 'https://avatar.vercel.sh/max.verstappen',
    },
    {
      firstname: 'Lewis',
      lastname: 'Hamilton',
      email: 'lewis.hamilton@mercedes.com',
      avatar: 'https://avatar.vercel.sh/lewis.hamilton',
    },
    {
      firstname: 'Charles',
      lastname: 'Leclerc',
      email: 'charles.leclerc@ferrari.com',
      avatar: 'https://avatar.vercel.sh/charles.leclerc',
    },
    {
      firstname: 'Lando',
      lastname: 'Norris',
      email: 'lando.norris@mclaren.com',
      avatar: 'https://avatar.vercel.sh/lando.norris',
    },
    {
      firstname: 'Carlos',
      lastname: 'Sainz',
      email: 'carlos.sainz@ferrari.com',
      avatar: 'https://avatar.vercel.sh/carlos.sainz',
    },
  ];

  for (const driver of drivers) {
    await prisma.member.upsert({
      where: { 
        email: driver.email,
      },
      update: {},
      create: driver,
    });
  }

  console.log('✅ F1 drivers seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding F1 drivers:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 