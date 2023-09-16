import PrivateRoute from "../../utils/PrivateRoute"

import Header from "../../components/Header"
import Gallery from "../../components/gallery/Gallery"

export default function HomePage() {
  return (
    <PrivateRoute>
      <Header />
      <Gallery />
    </PrivateRoute>
  )
}
