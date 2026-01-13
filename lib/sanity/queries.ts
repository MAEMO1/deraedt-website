import { sanityClient } from "./client";

// Project queries
export async function getProjects(category?: string) {
  const filter = category && category !== "alle"
    ? `&& category == "${category}"`
    : "";

  return sanityClient.fetch(`
    *[_type == "project" ${filter}] | order(year desc) {
      _id,
      title,
      slug,
      category,
      client,
      year,
      description,
      "mainImage": mainImage.asset->url,
      featured
    }
  `);
}

export async function getProject(slug: string) {
  return sanityClient.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      client,
      year,
      description,
      content,
      "mainImage": mainImage.asset->url,
      "gallery": gallery[].asset->url,
      beforeAfter {
        "before": before.asset->url,
        "after": after.asset->url
      }
    }
  `, { slug });
}

export async function getFeaturedProjects() {
  return sanityClient.fetch(`
    *[_type == "project" && featured == true] | order(year desc)[0...3] {
      _id,
      title,
      slug,
      category,
      client,
      year,
      description,
      "mainImage": mainImage.asset->url
    }
  `);
}

// Vacature queries
export async function getVacatures() {
  return sanityClient.fetch(`
    *[_type == "vacature" && active == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      department,
      type,
      description,
      requirements,
      benefits
    }
  `);
}

export async function getVacature(slug: string) {
  return sanityClient.fetch(`
    *[_type == "vacature" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      department,
      type,
      description,
      requirements,
      benefits
    }
  `, { slug });
}
