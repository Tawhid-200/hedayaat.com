export type Block =
  | { type: "text"; payload: { text: string } }
  | { type: "image"; payload: { url: string; alt?: string } }
  | { type: "ayah"; payload: { surah: number; ayah: number } }
  | { type: "link"; payload: { href: string; title?: string } };
