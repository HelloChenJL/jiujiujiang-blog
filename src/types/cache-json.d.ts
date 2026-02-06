declare module '@/cache/lqips.json' {
  const value: Record<string, string>;
  export default value;
}

declare module '@/cache/similarities.json' {
  interface SimilarPost {
    slug: string;
    title: string;
    similarity: number;
  }

  const value: Record<string, SimilarPost[]>;
  export default value;
}

declare module '@pagefind/default-ui';
