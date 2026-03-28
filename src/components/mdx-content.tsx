import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface MdxContentProps {
  source: string;
}

const components = {
  h1: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("font-serif", className)} {...props} />
  ),
  h2: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("font-serif", className)} {...props} />
  ),
  h3: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("font-serif", className)} {...props} />
  ),
  a: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={cn("text-primary hover:underline", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: ComponentPropsWithoutRef<"img">) => (
    <img
      alt={alt ?? ""}
      className={cn("rounded-lg", className)}
      {...props}
    />
  ),
};

export async function MdxContent({ source }: MdxContentProps) {
  const content = await MDXRemote({ source, components });
  return <div className="prose prose-lg max-w-none">{content}</div>;
}
