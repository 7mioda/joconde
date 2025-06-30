import { PrismaClient } from './types';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Read the projects.json file
  const projectsPath = path.join(__dirname, '..', 'projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  console.log(`📋 Found ${projectsData.length} projects to seed`);

  // Clear existing data
  await prisma.project.deleteMany({});
  console.log('🗑️  Cleared existing projects');

  // Map the old data format to new format
  const projectsToCreate = projectsData.map((project: any) => ({
    title: project.title,
    description: project.description,
    status: mapStatus(project.status || 'PLANNING'),
    priority: mapPriority(project.priority || 'MEDIUM'),
    ownerId: project.ownerId || 'default-owner',
    startDate: project.startDate ? new Date(project.startDate) : null,
    endDate: project.endDate ? new Date(project.endDate) : null,
  }));

  // Create projects in batches
  const batchSize = 50;
  for (let i = 0; i < projectsToCreate.length; i += batchSize) {
    const batch = projectsToCreate.slice(i, i + batchSize);
    await prisma.project.createMany({
      data: batch,
    });
    console.log(`✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(projectsToCreate.length / batchSize)}`);
  }

  console.log('🎉 Database seeding completed!');
}

function mapStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'planning':
      return 'PLANNING';
    case 'in progress':
      return 'IN_PROGRESS';
    case 'completed':
      return 'COMPLETED';
    case 'on hold':
      return 'ON_HOLD';
    case 'cancelled':
      return 'CANCELLED';
    default:
      return 'PLANNING';
  }
}

function mapPriority(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'LOW';
    case 'medium':
      return 'MEDIUM';
    case 'high':
      return 'HIGH';
    case 'critical':
      return 'CRITICAL';
    default:
      return 'MEDIUM';
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 