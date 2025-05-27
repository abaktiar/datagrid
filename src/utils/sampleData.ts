// Sample data generator for DataGrid demo

const firstNames = [
  'John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen',
  'Ivan', 'Julia', 'Kevin', 'Laura', 'Michael', 'Nancy', 'Oliver', 'Patricia', 'Quinn', 'Rachel',
  'Samuel', 'Teresa', 'Ulrich', 'Victoria', 'William', 'Xenia', 'Yolanda', 'Zachary', 'Amanda', 'Brian',
  'Catherine', 'David', 'Elizabeth', 'Frank', 'Grace', 'Henry', 'Isabella', 'James', 'Katherine', 'Louis',
  'Margaret', 'Nicholas', 'Olivia', 'Peter', 'Quincy', 'Rebecca', 'Steven', 'Tiffany', 'Ursula', 'Vincent'
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
]

const departments = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Operations', 
  'Customer Support', 'Product Management', 'Quality Assurance', 'Research & Development',
  'Legal', 'Business Development', 'Data Science', 'DevOps', 'Security'
]

const statuses = ['Active', 'Inactive', 'Pending']

const domains = [
  'example.com', 'company.org', 'business.net', 'corp.com', 'enterprise.io',
  'startup.co', 'tech.dev', 'innovation.ai', 'digital.app', 'solutions.biz'
]

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomDate(startYear: number = 2015, endYear: number = 2023): string {
  const start = new Date(startYear, 0, 1)
  const end = new Date(endYear, 11, 31)
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  return new Date(randomTime).toISOString().split('T')[0]
}

function getRandomSalary(): number {
  // Generate realistic salary ranges based on common ranges
  const ranges = [
    { min: 45000, max: 65000, weight: 0.3 }, // Junior
    { min: 65000, max: 95000, weight: 0.4 }, // Mid-level
    { min: 95000, max: 140000, weight: 0.2 }, // Senior
    { min: 140000, max: 200000, weight: 0.1 }, // Lead/Principal
  ]
  
  const random = Math.random()
  let cumulativeWeight = 0
  
  for (const range of ranges) {
    cumulativeWeight += range.weight
    if (random <= cumulativeWeight) {
      return getRandomNumber(range.min, range.max)
    }
  }
  
  return getRandomNumber(45000, 200000)
}

export interface SampleDataItem {
  id: number
  name: string
  email: string
  age: number
  department: string
  salary: number
  startDate: string
  status: string
}

export function generateSampleData(count: number): SampleDataItem[] {
  const data: SampleDataItem[] = []
  
  for (let i = 1; i <= count; i++) {
    const firstName = getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomItem(domains)}`
    
    data.push({
      id: i,
      name,
      email,
      age: getRandomNumber(22, 65),
      department: getRandomItem(departments),
      salary: getRandomSalary(),
      startDate: getRandomDate(),
      status: getRandomItem(statuses),
    })
  }
  
  return data
}

// Export some utilities for demo purposes
export const sampleDataUtils = {
  firstNames,
  lastNames,
  departments,
  statuses,
  domains,
  getRandomItem,
  getRandomNumber,
  getRandomDate,
  getRandomSalary,
}
