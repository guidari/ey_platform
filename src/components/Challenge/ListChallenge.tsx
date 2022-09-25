import { Box, Rating } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { collection, getDocs } from "firebase/firestore"
import { SetStateAction, useEffect, useState } from "react"
import { db } from "../../config/firebase"

export default function ListChallenge({ onRowClick }: any) {
  const [challenges, setChallenges] = useState<any[]>([])

  useEffect(() => {
    getChallenges()
  }, [])

  async function getChallenges() {
    const querySnapshot = await getDocs(collection(db, "challenges"))

    querySnapshot.forEach((doc) => {
      const document: SetStateAction<any[]> = []

      querySnapshot.forEach((doc) => {
        document.push({
          ...doc.data(),
        })
      })

      setChallenges(document)
    })
  }

  console.log("challenges", challenges)

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 393,
      headerClassName: "header-style",
    },
    {
      field: "level",
      headerName: "Level",
      width: 200,
      headerClassName: "header-style",
    },
    {
      field: "rating",
      headerName: "Rating",
      renderCell: (params: any) => (
        <Rating
          sx={{
            color: "var(--yellow-1)",
          }}
          name="read-only"
          defaultValue={params.value}
          precision={0.5}
          readOnly
        />
      ),
      width: 200,
      headerClassName: "header-style",
    },
  ]

  return (
    <Box
      sx={{
        height: 635,
        width: "100%",
        "& .header-style": {
          backgroundColor: "var(--gray-100)",
          color: "var(--white)",
        },
      }}
    >
      <DataGrid
        sx={{
          cursor: "pointer",
          backgroundColor: "var(--gray-300)",
          color: "var(--white)",
          "& .MuiDataGrid-cell:hover": {
            color: "var(--yellow-1)",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            fill: "var(--white)",
          },
        }}
        rows={challenges}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={onRowClick}
        autoHeight
      />
    </Box>
  )
}
