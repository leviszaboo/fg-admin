import PrivateRoute from "../../utils/PrivateRoute"

import Header from "../../components/home/Header"
import Gallery from "../../components/home/Gallery"

export default function HomePage() {
  return (
    <PrivateRoute>
      <Header />
      <Gallery />
    </PrivateRoute>
  )
}
