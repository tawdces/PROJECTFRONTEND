import { getCampground } from "@/libs/api";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

export default async function CampgroundDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const campground = await getCampground(cid);
  const data = campground.data;
  const heroImage = data.imageUrl || "/img/cover.jpg";

  return (
    <Box sx={{ bgcolor: "#f4f6fb", minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            mb: 4,
            boxShadow: 4,
            height: { xs: 260, md: 420 },
          }}
        >
          <Image
            src={heroImage}
            alt={data.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1200px"
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
              display: "flex",
              alignItems: "flex-end",
              p: { xs: 3, md: 5 },
            }}
          >
            <Stack spacing={2} sx={{ color: "white" }}>
              <Box>
                <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
                  Featured Campground
                </Typography>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {data.name}
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 520 }}>
                  Escape to nature with modern amenities and unforgettable scenery.
                </Typography>
              </Box>
              <Button
                component={Link}
                href={`/booking?campgroundId=${data._id}`}
                variant="contained"
                size="large"
                sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, color: "white" }}
              >
                Book this campground
              </Button>
            </Stack>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Card sx={{ width: "100%", maxWidth: 720 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography>{data.address}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Telephone
                  </Typography>
                  <Typography>{data.telephone}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}