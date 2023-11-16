import {PrismaClient} from '@prisma/client';

interface Observer {
    [operation: string]: (args: any) => Promise<void> | void;
}

const observerInstances: { [className: string]: Observer } = {};
/**
 * 
 * @param className className to instantiate
 * @returns a new or existing Observer class
 */
async function getObserverInstance(className: string): Promise<Observer> {
  if (!observerInstances[className]) {
    const observerModule = await import(`@/observers/${className}`);
    const ObserverClass: new () => Observer = observerModule.default;
    observerInstances[className] = new ObserverClass();
  }
  return observerInstances[className];
}


let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient().$extends({
        query: {
            async $allOperations({model, operation, args, query}) {

                const observerClassName = `${model?.toLowerCase()}.observer`;
                const result = await query(args);

                try {
                    const observer = await getObserverInstance(observerClassName);

                    const observerOperation: string = `${operation}d`;

                    if (typeof observer[observerOperation] === 'function') {
                        await observer[observerOperation](result);
                    }

                } catch {
                }
                return result;
            }
        }
    }) as PrismaClient;
} else {
    const globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
        const prisma = new PrismaClient() as unknown as PrismaClient;

        globalWithPrisma.prisma = prisma.$extends({
            query: {
                async $allOperations({model, operation, args, query}) {

                    const observerClassName = `${model?.toLowerCase()}.observer`;
                    const result = await query(args);

                    try {
                        const observer = await getObserverInstance(observerClassName);

                        const observerOperation: string = `${operation}d`;

                        if (typeof observer[observerOperation] === 'function') {
                            await observer[observerOperation](result);
                        }

                    } catch {
                    }
                    return result;
                }
            }
        }) as unknown as PrismaClient;
    }
    prisma = globalWithPrisma.prisma;
}

export default prisma;