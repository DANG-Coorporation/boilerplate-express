export interface IPaginate<T> {
  page: number;
  limit: number;
  data: Partial<T>;
}
