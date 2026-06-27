import HomeClient from "@/components/HomeClient";
import portfolioData from "@/data/portfolio.json";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${portfolioData.meta.url}/#person`,
      name: portfolioData.meta.name,
      url: portfolioData.meta.url,
      jobTitle: "Full-Stack Developer",
      description: portfolioData.meta.description,
      sameAs: [
        "https://github.com/FakhirAhmedKhan",
        "https://linkedin.com/in/fakhir-ahmed-3b5537316",
        "https://twitter.com/FakhirAhme41220",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "Tailwind CSS",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${portfolioData.meta.url}/#website`,
      url: portfolioData.meta.url,
      name: `${portfolioData.meta.name} Portfolio`,
      description: `Personal portfolio website of ${portfolioData.meta.name}`,
      author: { "@id": `${portfolioData.meta.url}/#person` },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
