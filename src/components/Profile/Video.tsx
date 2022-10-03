import { doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { useContext, useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"

export default function Video() {
  const user = useContext(UserContext)

  const [userVideo, setUserVideo] = useState<string>()
  const [rand, setRand] = useState(0)

  useEffect(() => {
    setUserVideo(`${user?.video}?noCache=${Math.random()}`)
  }, [])

  const updateVideo = (event: any) => {
    const videoUpload = event.target.files[0]

    const preview = document.getElementById("videoChosen") as HTMLImageElement

    // if (!videoUpload.name.match(/\.(mp4|mkv)$/)) {
    //   alert("Insert a valid format: .mp4 or .mkv")
    //   return false
    // }

    // if (videoUpload.size > 1000000000) {
    //   alert(`The video is to big. We accept video up to 1gb`)
    //   return false
    // }

    const storage = getStorage()
    const storageRef = ref(storage, `${user?.id}video`)

    uploadBytes(storageRef, videoUpload).then((snapshot) => {
      console.log("Uploaded a blob or file!")
    })

    let video

    if (!videoUpload && !user?.video) {
      video = ""
    } else {
      video = `https://firebasestorage.googleapis.com/v0/b/ey-platform.appspot.com/o/${user?.id}video?alt=media&token=be9fab49-74d8-4c91-8d66-9f29c08c94fa`
    }

    updateDoc(doc(db, `users/${user?.id}`), {
      video,
    })
    setRand(rand + 1)
    console.log("Video updated")
  }

  return (
    <>
      <h1 className="text-xl font-semibold">Video Introduction</h1>

      <div className="flex">
        {/* <VideoCameraIcon className="w-6 text-gray-3 bg-yellow-1 rounded-bl-md rounded-tl-md" /> */}
        <input
          accept=".mp4 .mkv"
          type="file"
          className="block w-full mt-5 text-sm text-gray-4
file:mr-4 file:py-2 file:px-4
file:rounded-md file:border-0
file:text-sm file:font-semibold
file:bg-yellow-1 file:text-gray-3
hover:opacity-80
"
          onChange={updateVideo}
        />
      </div>

      <video width="100%" height="250" style={{ marginTop: 20 }} controls>
        <source
          src={
            userVideo
              ? `${userVideo}?noCache=${Math.random() + rand}`
              : `${user?.video}?noCache=${Math.random() + rand}`
          }
        />
      </video>
    </>
  )
}
