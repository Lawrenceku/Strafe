import dotenv from 'dotenv'
dotenv.config()

const postgres_password = process.env.POSTGRES_PASSWORD

export { postgres_password }