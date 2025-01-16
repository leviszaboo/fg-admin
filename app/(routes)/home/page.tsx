import PrivateRoute from "@/app/utils/routing/PrivateRoute";

import Header from "@/components/Header";
import Gallery from "@/components/gallery/Gallery";

export default function HomePage() {
  return (
    <PrivateRoute>
      <Header />
      <Gallery />
    </PrivateRoute>
  );
}
