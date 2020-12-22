import winston from 'winston';

export const winstonLogger = winston.createLogger({
   level: 'debug',
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format((info) => {
         info.message = `[${(info.level as string).toUpperCase()}] ${info.timestamp} : ${info.message}`;

         return info;
      })(),
   ),
   defaultMeta: { service: 'user-service' },
   transports: [
      new winston.transports.Console({
         format: winston.format.printf(info => `${info.message}`)
     }),
   ],
});
