export default {
  port: process.env.APP_PORT,
  DB_TABLE_NAME: process.env.DB_TABLE_NAME,
  DB_HOST_NAME: process.env.DB_HOST_NAME,
  ENDPOINT_DB: process.env.ENDPOINT_DB,

  REGION: process.env.REGION,
  IS_OFFLINE: process.env.IS_OFFLINE,
}

export const DEFAULT_LIMIT = {
  PET: 10
}