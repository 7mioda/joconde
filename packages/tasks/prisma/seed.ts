import { PrismaClient } from './types';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Read the tasks.json file
  const tasksPath = path.join(__dirname, '..', 'tasks.json');
  const tasksData = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

  console.log(`📋 Found ${tasksData.length} tasks to seed`);

  // Clear existing data
  await prisma.task.deleteMany({});
  console.log('🗑️  Cleared existing tasks');

  // Map the old data format to new format
  const tasksToCreate = tasksData.map((task: any) => ({
    title: task.title,
    description: task.description,
    status: mapStatus(task.status),
    label: mapLabel(task.label),
    projectId: task.projectId,
    priority: mapPriority(task.priority),
    assigneeId: task.assigneeId,
  }));

  // Create tasks in batches
  const batchSize = 50;
  for (let i = 0; i < tasksToCreate.length; i += batchSize) {
    const batch = tasksToCreate.slice(i, i + batchSize);
    await prisma.task.createMany({
      data: batch,
    });
    console.log(`✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(tasksToCreate.length / batchSize)}`);
  }

  console.log('🎉 Database seeding completed!');
}

function mapStatus(status: string): string {
  switch (status.toLowerCase()) {
    case 'todo':
      return 'TODO';
    case 'in progress':
      return 'IN_PROGRESS';
    case 'done':
      return 'DONE';
    case 'backlog':
      return 'BACKLOG';
    case 'canceled':
      return 'CANCELED';
    default:
      return 'TODO';
  }
}

function mapLabel(label: string): string {
  switch (label.toLowerCase()) {
    case 'bug':
      return 'BUG';
    case 'feature':
      return 'FEATURE';
    case 'documentation':
      return 'DOCUMENTATION';
    default:
      return 'FEATURE';
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