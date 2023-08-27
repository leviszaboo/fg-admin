import PrivateRoute from "../../utils/PrivateRoute"

import Header from "../../components/home/Header"
import FeaturedGallery from "@/app/components/featured-photos/FeaturedGallery"

export default function FeaturedPage() {
  return (
    <>
      <PrivateRoute>
        <Header />
        <FeaturedGallery />
      </PrivateRoute>
    </>
  )
}