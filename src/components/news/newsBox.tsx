import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

export default function NewsBox({ title, description, image, link }: any) {
  return (
    <Card sx={{ maxWidth: 390 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent
        sx={{
          backgroundColor: "var(--gray-100)",
          color: "white",
          minHeight: 175,
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          sx={{ backgroundColor: "var(--gray-100)", color: "white" }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: "var(--gray-100)", color: "white" }}>
        <Button size="small" sx={{ color: "var(--yellow-1)" }}>
          Share
        </Button>
        <Button
          size="small"
          sx={{ color: "var(--yellow-1)" }}
          href={link}
          target="_blank"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
