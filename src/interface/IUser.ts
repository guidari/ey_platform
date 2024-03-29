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
  userLevel: number
  languages: []
  enrolledCourses: []
  submitedChallenges: []
  completedCourses: number
  hours: number
  challenges: number
  coursesInProgress: number
  weekChallenge: number
  arrayCompletedCourses: []
  skills: [string]
  notifications: []
  appliedJobs: []
  video: string
  progress: {
    completedCourses: number
    hours: number
    challenges: number
    coursesInProgress: number
  }
  location: string
  phone: string
}
