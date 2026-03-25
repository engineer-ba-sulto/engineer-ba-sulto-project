import { getCollection } from "astro:content";
import type { Project } from "../types/project";

export async function loadProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");
  return projects
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    )
    .map((p) => ({
      slug: p.data.slug,
      title: p.data.title,
      description: p.data.description,
      image: p.data.image,
      tags: p.data.tags,
      detail: p.data.detail,
    }));
}
