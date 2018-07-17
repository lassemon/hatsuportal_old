/**
 * @tsoaModel
 */
export interface Item {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  authorId: number;
  authorName: string;
  tags: any[];
}
