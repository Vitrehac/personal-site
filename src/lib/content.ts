import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ContentMeta,
  ContentEntry,
  ProjectMeta,
  WorkMeta,
  PhotoMeta,
  TimelineEvent,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function getFilesFromDir(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parseFile<T extends ContentMeta>(
  dir: string,
  filename: string
): ContentEntry<T> {
  const filePath = path.join(contentDir, dir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");

  return {
    meta: { ...data, slug } as T,
    content,
  };
}

export function getAllContent<T extends ContentMeta>(
  dir: string
): ContentEntry<T>[] {
  const files = getFilesFromDir(dir);
  return files
    .map((f) => parseFile<T>(dir, f))
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export function getContentBySlug<T extends ContentMeta>(
  dir: string,
  slug: string
): ContentEntry<T> | null {
  const files = getFilesFromDir(dir);
  const file = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  return parseFile<T>(dir, file);
}

export function getAllSlugs(dir: string): string[] {
  return getFilesFromDir(dir).map((f) => f.replace(/\.mdx?$/, ""));
}

export function getProjects() {
  return getAllContent<ProjectMeta>("projects");
}

export function getProject(slug: string) {
  return getContentBySlug<ProjectMeta>("projects", slug);
}

export function getWorkEntries() {
  return getAllContent<WorkMeta>("work");
}

export function getWorkEntry(slug: string) {
  return getContentBySlug<WorkMeta>("work", slug);
}

export function getPhotos() {
  return getAllContent<PhotoMeta>("photography");
}

export function getPhoto(slug: string) {
  return getContentBySlug<PhotoMeta>("photography", slug);
}

export function getTimelineEvents() {
  return getAllContent<TimelineEvent>("timeline");
}

export function getFeaturedProjects() {
  return getProjects().filter((p) => p.meta.featured);
}

export function getAllTags(dir: string): string[] {
  const entries = getAllContent(dir);
  const tagSet = new Set<string>();
  entries.forEach((e) => e.meta.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
