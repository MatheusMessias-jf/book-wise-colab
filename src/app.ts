import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/book/create', async (req, res) => {
  const bookBodySchema = z.object({
    name: z.string(),
    author: z.string(),
    summary: z.string(),
    coverUrl: z.string(),
    totalPages: z.coerce.number(),
  })

  const data = bookBodySchema.parse(req.body)
  await prisma.book.create({
    data: {
      author: data.author,
      cover_url: data.coverUrl,
      name: data.name,
      summary: data.summary,
      total_pages: data.totalPages,
    },
  })

  return res.status(201).send()
})
