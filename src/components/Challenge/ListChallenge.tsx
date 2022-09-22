import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

export default function ListChallenge() {
  const rows = [
    {
      id: 1,
      title: "React",
      level: "Easy",
    },
    {
      id: 2,
      title: "Java",
      level: "Medium",
    },
  ]

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 252,
      headerClassName: "header-style",
    },
    {
      field: "level",
      headerName: "Level",
      width: 252,
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
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // onRowClick={onRowClick}
        autoHeight
      />
    </Box>
  )
}