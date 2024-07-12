import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/day";
import { ClientError } from "../errors/client-error";


export async function updateTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                destination: z.string().min(4),
                starts_at: z.coerce.date(),
                ends_at: z.coerce.date(),
            })
        },
    }, async (request) => {
        const { tripId } = request.params;
        const { destination, starts_at, ends_at } = request.body;

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            }
        })

        if (!trip) {
            throw new ClientError('Trip not found')
        }

        if (dayjs(starts_at).isBefore(trip.starts_at)) {
            return new ClientError('Invalid trip date')
        }

        if (dayjs(ends_at).isAfter(trip.ends_at)) {
            return new ClientError('Invalid trip date')
        }

        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                destination,
                starts_at,
                ends_at
            }
        })

        return { tripsId: trip.id }
    })
}