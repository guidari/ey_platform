export type IUser = {
  id: string
  name: string
  email: string
  about: string
  github: string
  linkedin: string
  headline: string
  image: string
  eycoin: number
  languages: []
  enrolledCourses: []
  submitedChallenges: []
  skills: []
  progress: {
    completedCourses: number
    hours: number
    challenges: number
    enrolledCourses: number
  }
  location: string
  phone: string
}
