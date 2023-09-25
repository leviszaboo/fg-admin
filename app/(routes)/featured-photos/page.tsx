import PrivateRoute from "../../utils/PrivateRoute"
import FeaturedGallery from "@/components/featured-photos/FeaturedGallery"
import Header from "@/components/Header"

export default function FeaturedPage() {
  return (
    <PrivateRoute>
      <Header />
      <FeaturedGallery />
    </PrivateRoute>
  )
}