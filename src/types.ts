export type ID = string;

export interface Course {
  _id: ID;
  domainId: string;
  name: string;
  desc?: string;
  cover?: string;
  classIds: ID[];
  teacherIds: number[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export interface Class {
  _id: ID;
  domainId: string;
  name: string;
  desc?: string;
  studentIds: number[];
  courseIds: ID[];
  createdAt: Date;
  updatedAt: Date;
}

export type LectureType = 'pdf' | 'markdown' | 'video';

export interface Lecture {
  _id: ID;
  domainId: string;
  courseId: ID;
  title: string;
  type: LectureType;
  fileId?: string;
  content?: string;
  chapter?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
  isPrivate?: boolean;
}

export interface Assignment {
  _id: ID;
  domainId: string;
  courseId: ID;
  pid: number;
  title?: string;
  dueAt?: Date;
  weight?: number;
  createdAt: Date;
}

export interface Progress {
  _id: ID;
  domainId: string;
  courseId: ID;
  uid: number;
  lectureId?: ID;
  readAt?: Date;
  percent?: number;
  stats?: { solved: number; submitted: number; accepted: number };
  updatedAt: Date;
}
