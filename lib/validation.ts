import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.url()
    .refine(async (url) => {
      try {
        const res = await fetch("/api/check-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        const data = await res.json();
        console.log("data: ", data)
        return data.ok; 

      } catch {
        return false;
      }
    })
    ,
  pitch: z.string().min(10),
});