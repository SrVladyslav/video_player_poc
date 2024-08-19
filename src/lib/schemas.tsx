"use client"

import { z } from "zod"

export const uploadVideoSchema = z.object({
  username: z.string().min(2).max(50),
})
