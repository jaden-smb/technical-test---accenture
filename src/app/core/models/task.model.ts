export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  completed: boolean;
  createdAt: string;
}
