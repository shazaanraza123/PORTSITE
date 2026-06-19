import type { Project, ProjectImage } from "../data/projects";

function aspectClass(aspect?: ProjectImage["aspect"]) {
  switch (aspect) {
    case "16/9":
      return "aspect-[16/9]";
    case "4/3":
      return "aspect-[4/3]";
    case "1/1":
      return "aspect-square";
    case "3/4":
      return "aspect-[3/4]";
    case "9/16":
      return "aspect-[9/16]";
    default:
      return "aspect-[4/3]";
  }
}

function ImageFrame({ image }: { image: ProjectImage }) {
  const fitClass =
    image.aspect === "3/4" || image.aspect === "9/16"
      ? "object-contain"
      : "object-cover";

  if (image.src) {
    return (
      <div
        className={`overflow-hidden bg-[var(--color-tan)]/10 ${aspectClass(image.aspect)} ${image.span ?? ""}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={`h-full w-full ${fitClass}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`image-placeholder w-full ${aspectClass(image.aspect)} ${image.span ?? ""}`}
    >
      <span>{image.placeholder}</span>
    </div>
  );
}

function Hero3Col({ images }: { images: ProjectImage[] }) {
  const [hero, ...rest] = images;
  return (
    <div className="grid gap-4">
      <ImageFrame image={hero} />
      <div className="grid gap-4 sm:grid-cols-3">
        {rest.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
    </div>
  );
}

function TwoColFull({ images }: { images: ProjectImage[] }) {
  const last = images[images.length - 1];
  const rest = images.slice(0, -1);
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
      <ImageFrame image={last} />
    </div>
  );
}

function Full2Col({ images }: { images: ProjectImage[] }) {
  const [hero, ...rest] = images;
  return (
    <div className="grid gap-4">
      <ImageFrame image={hero} />
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
    </div>
  );
}

function Hero2Col({ images }: { images: ProjectImage[] }) {
  const [hero, ...rest] = images;
  return (
    <div className="grid gap-4">
      <ImageFrame image={hero} />
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
    </div>
  );
}

function Stats2x2({ images }: { images: ProjectImage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <ImageFrame key={img.alt} image={img} />
      ))}
    </div>
  );
}

function Full3Col({ images }: { images: ProjectImage[] }) {
  const [hero, ...rest] = images;
  return (
    <div className="grid gap-4">
      <ImageFrame image={hero} />
      <div className="grid gap-4 sm:grid-cols-3">
        {rest.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
    </div>
  );
}

function MobileShowcase({ images }: { images: ProjectImage[] }) {
  const [hero, ...phones] = images;

  return (
    <div className="mobile-showcase">
      {hero && (
        <div className="mobile-showcase-hero">
          {hero.src ? (
            <div className="mobile-showcase-device">
              <img src={hero.src} alt={hero.alt} loading="lazy" />
            </div>
          ) : (
            <div className="image-placeholder mobile-showcase-device aspect-[3/4]">
              <span>{hero.placeholder}</span>
            </div>
          )}
        </div>
      )}

      {phones.length > 0 && (
        <div className="mobile-showcase-phones">
          {phones.map((img) =>
            img.src ? (
              <div key={img.alt} className="mobile-showcase-phone">
                <div className="mobile-showcase-phone-screen">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              </div>
            ) : (
              <div
                key={img.alt}
                className="image-placeholder mobile-showcase-phone aspect-[9/16]"
              >
                <span>{img.placeholder}</span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function Mosaic({ images }: { images: ProjectImage[] }) {
  const [tall, topRight, midRight, ...bottom] = images;
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
        <div className="md:row-span-2">
          <ImageFrame image={tall} />
        </div>
        <ImageFrame image={topRight} />
        <ImageFrame image={midRight} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {bottom.map((img) => (
          <ImageFrame key={img.alt} image={img} />
        ))}
      </div>
    </div>
  );
}

export function ProjectImageGrid({ project }: { project: Project }) {
  switch (project.layout) {
    case "hero-3col":
      return <Hero3Col images={project.images} />;
    case "2col-full":
      return <TwoColFull images={project.images} />;
    case "full-2col":
      return <Full2Col images={project.images} />;
    case "full-3col":
      return <Full3Col images={project.images} />;
    case "hero-2col":
      return <Hero2Col images={project.images} />;
    case "stats-2x2":
      return <Stats2x2 images={project.images} />;
    case "mosaic":
      return <Mosaic images={project.images} />;
    case "mobile-showcase":
      return <MobileShowcase images={project.images} />;
    default:
      return <Hero3Col images={project.images} />;
  }
}
