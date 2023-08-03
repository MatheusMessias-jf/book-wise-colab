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

app.get('/books', async (req, res) => {
  const books = await prisma.book.findMany({
    select: {
      author: true,
      id: true,
      cover_url: true,
      Rating: true,
    },
  })

  return res.status(200).send(books)
})

app.get('/books/popular', async (_req, res) => {
  const popularRatings = await prisma.rating.findMany({
    orderBy: {
      rate: 'desc',
    },
    distinct: ['book_id'],
    take: 5,
  })

  const books = await prisma.book.findMany({
    where: {
      id: {
        in: popularRatings.map((rating) => rating.book_id),
      },
    },
    include: {
      Rating: true,
    },
  })

  books.sort((a, b) => {
    const rateA =
      popularRatings.find((rating) => rating.book_id === a.id)?.rate || 0
    const rateB =
      popularRatings.find((rating) => rating.book_id === b.id)?.rate || 0
    return rateB - rateA
  })

  return res.status(200).send(books)
})

app.post('/rating', async (req, res) => {
  const ratingBodySchema = z.object({
    rate: z.coerce.number().min(1),
    description: z.string(),
    bookId: z.string(),
  })

  const { bookId, description, rate } = ratingBodySchema.parse(req.body)

  await prisma.rating.create({
    data: {
      description,
      rate,
      book_id: bookId,
    },
  })

  return res.status(201).send()
})
