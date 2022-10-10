import { LocationMarkerIcon } from "@heroicons/react/outline"
import { useContext, useEffect, useState } from "react"

import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { useRouter } from "next/router"
import Button from "../../components/Button/Button"
import Layout from "../../components/Layout"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import { IJobBox } from "../../interface/IJobBox"

export default function JobDescription() {
  const userContext = useContext(UserContext)

  const router = useRouter()

  const [job, setJobb] = useState<IJobBox | DocumentData>()
  const [openModal, setOpenModal] = useState(false)

  let colorDisable
  let disabledSubmit
  let title

  if (!userContext) {
    disabledSubmit = true
    colorDisable = "bg-gray-2"
    title = "Sign in to apply for a job"
  }

  const {
    query: { id },
  } = router

  const fetchJob = async () => {
    try {
      let jobId
      if (!id) {
        jobId = localStorage.getItem("jobId")
      } else {
        jobId = id
      }
      const q = query(collection(db, "jobs"), where("id", "==", jobId))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setJobb(data)
    } catch (err) {
      console.log("Job not found")
    }
  }

  useEffect(() => {
    fetchJob()
  }, [])

  const applyJob = (id: string) => {
    console.log("id job", id)
    const newNumber = job?.applications + 1
    setOpenModal(true)
    updateDoc(doc(db, `jobs/${id}`), {
      applications: newNumber,
    })
    updateDoc(doc(db, `users/${userContext?.id}`), {
      appliedJobs: arrayUnion(id),
    })
    alert("Your information was sent to the recruiter! Good luck!")
  }

  return (
    <Layout>
      {/* HEADER */}
      <div className="w-full bg-gray-1 py-5">
        <div className="w-5/6 m-auto max-w-screen-xl py-5 flex place-items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{job?.title}</h1>
            <p>ID: {job?.id} | Ernst & Young</p>
          </div>

          <div>
            <Button
              onClick={() => applyJob(job?.id)}
              {...userContext?.appliedJobs.map((item: any) => {
                if (item == job?.id) {
                  disabledSubmit = true
                  colorDisable = "bg-gray-2"
                  title = "You have already applied to this job"
                } else {
                }
              })}
              disabled={disabledSubmit}
              color={colorDisable}
              title={title}
            >
              Apply now
            </Button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="w-5/6 m-auto max-w-screen-xl py-5">
        <div className="grid grid-cols-5 maxmd:grid-cols-1 gap-10">
          <div className="col-span-4">
            <h1 className="text-lg font-semibold">Job description</h1>
            <p>O que esperamos de você?</p>
            <p>
              Estamos buscando pessoas que queiram se desenvolver e aprender
              constantemente, compartilhando, colaborando, inovando e entregando
              valor para todos os nossos clientes.
            </p>
            <br />

            <strong>Responsabilidades da Oportunidade</strong>
            <br />

            <ul>
              <li>Atuação em time ágil e multidisciplinar com engenharia;</li>
              <li>Desenvolvimento de Front end;</li>
              <li>
                Construir soluções e suportar os processos de Garantias de
                Imóveis;
              </li>
            </ul>
            <br />

            <strong>Requisitos</strong>

            <ul>
              <li>HTML;</li>
              <li>Micro Front-End;</li>
              <li>Javascript;</li>
              <li>TypeScript;</li>
              <li>Angular;</li>
              <li>CSS;</li>
              <li>Github;</li>
              <li>Conhecimento em arquitetura de micro front end.</li>
            </ul>
          </div>

          <div>
            <div className="divide-y divide-yellow-1">
              <h2 className="text-lg font-semibold py-2">Job details</h2>

              <div className="py-2">
                <div className="flex gap-2 place-items-center">
                  <LocationMarkerIcon className="text-yellow-1 w-5 h-5" />
                  Vancouver
                </div>
                <div className="flex gap-2 place-items-center">
                  <div>
                    <img src="/images/laptop.png" alt="laptop" />
                  </div>
                  Remote option
                </div>
                <div className="flex gap-2 place-items-center">
                  <div>
                    <img src="/images/job.png" alt="job" />
                  </div>
                  Software Developer
                </div>
              </div>

              <div className="py-2">
                <h2 className="text-lg font-semibold py-2">Related Jobs</h2>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Back-end Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Front-end Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Full-stack Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
