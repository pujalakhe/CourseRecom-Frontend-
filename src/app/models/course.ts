export interface Course {
  course_id: any;
  name: string;
  university: string;
  difficulty: string;
  rating: number;
  url: string;
  description: string;
  view_count: number;
  rating_count: number;
  average_rating: number | null;
  skills: string;
}

export interface CourseSearchResponse {
  count: number;
  next: string;
  previous: string;

  results: {
    message: string;
    recommendations: Course[];
  };
}

export interface popularCoursesResponse {
  popular_courses: Course[];
}
