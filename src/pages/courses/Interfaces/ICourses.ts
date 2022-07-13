export interface ICourses {
  aggregations: Array<any>
  boosted_language: string
  count: number
  next: string
  previous: string
  results: Array<any>
  search_tracking_id: string
}

export interface ICourse {
  curriculum_items: Array<any>
  curriculum_lectures: Array<any>
  headline: string
  url: string
  id: number
  image_125_H: string
  image_240x135: string
  image_480x270: string
  title: string
  visible_instructors: Array<any>
}
