import fastify from "fastify";
import { prisma } from "./lib/prisma";
import cors from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmPartipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createlink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-partipants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./errorHandler";
import { env } from "./env";

const app = fastify();

app.register(cors, {
    origin: '*',
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmPartipants);
app.register(createActivity);
app.register(getActivities);
app.register(createlink);
app.register(getLinks);
app.register(getParticipants);
app.register(getParticipant);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);

app.listen({ port: env.PORT }).then(() => {
    console.log("HTTP Server running on http://localhost:3000");
})