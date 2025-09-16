const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "Pragma",
  ],
  optionsSuccessStatus: 200,
};
const MONGO_URL =
  "mongodb+srv://baganasatyavathi:nannaamma@cluster0.q7a77h7.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "Nannaamma";
// NODE_ENV = development

module.exports = {
  corsOptions,
  MONGO_URL,
  JWT_SECRET,
};
