export const config = {
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: ['http://localhost:5173'],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  },
};
