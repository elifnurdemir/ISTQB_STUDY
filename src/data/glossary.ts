import raw from "./glossary.json";
import type { GlossaryTerm } from "../types";

export const glossaryTerms: GlossaryTerm[] = raw as GlossaryTerm[];

export function getGlossaryByChapter(chapter: number): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.chapter === chapter);
}
