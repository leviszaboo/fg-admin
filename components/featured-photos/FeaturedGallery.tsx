import FeaturedPhotos from "./FeaturedPhotos";

export default function FeaturedGallery() {
    return (
      <div className="absolute flex flex-col w-full left-1/2 -translate-x-1/2 justify-center items-center gap-5">
        <FeaturedPhotos title={"Home Page (horizontal)"} type={"horizontal"} />
        <FeaturedPhotos title={"Home Page (vertical) - phone screens"} type={"vertical"} />
        <FeaturedPhotos title={"About Page"} type={"about-me"} />
        <FeaturedPhotos title={"Intro Page (scroll-down)"} type={"intro"} />
    </div>
    );
  }