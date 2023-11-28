import { NextResponse, NextRequest } from 'next/server';
export async function GET() {
  const data ={
    data: [
      { subjectCode: 'A001', taskNumber: 1, taskTopic: 'Basic Mathematics', dueDate: '2023-10-01' },
      {
        subjectCode: 'A002',
        taskNumber: 2,
        taskTopic: 'Principles of Physics',
        dueDate: '2023-10-05',
      },
      { subjectCode: 'A003', taskNumber: 3, taskTopic: 'Chemical Reactions', dueDate: '2023-10-10' },
      {
        subjectCode: 'A004',
        taskNumber: 4,
        taskTopic: 'Evolution of Biology',
        dueDate: '2023-10-15',
      },
      { subjectCode: 'A005', taskNumber: 5, taskTopic: 'Advanced Algebra', dueDate: '2023-10-20' },
      { subjectCode: 'A006', taskNumber: 6, taskTopic: 'Quantum Mechanics', dueDate: '2023-10-25' },
      { subjectCode: 'A007', taskNumber: 7, taskTopic: 'Organic Chemistry', dueDate: '2023-10-30' },
      { subjectCode: 'A008', taskNumber: 8, taskTopic: 'Cell Biology', dueDate: '2023-11-01' },
      {
        subjectCode: 'A009',
        taskNumber: 9,
        taskTopic: 'Calculus Fundamentals',
        dueDate: '2023-11-05',
      },
      {
        subjectCode: 'A010',
        taskNumber: 10,
        taskTopic: 'Space & Time in Physics',
        dueDate: '2023-11-10',
      },
    ]
  }
  return NextResponse.json(data);
}