export interface Course {
  course_id: number;
  name: string;
  university: string;
  difficulty: string;
  rating: number;
  url: string;
  description: string;
}
export interface CourseSearchResponse {
  count: number;
  next: number;
  previous: number;

  results: {
    message: string;

    recommendations: Course[];
  };
}
