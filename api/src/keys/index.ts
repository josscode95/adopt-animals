export default{
  DB: {
    URI: process.env.MONGODB_CNN || ''
  },
  PORT: process.env.PORT || 4000,
  SECRETPRIVATEKEY: process.env.SECRETPRIVATEKEY || '',
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID || '',
}