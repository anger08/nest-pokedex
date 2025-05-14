// esto se hace para configurar las variables de entorno por si acaso no estan definidas en el .env y lanzar algun tipo de error o condicional
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: +(process.env.DEFAULT_LIMIT || 10),
}); // <--- esto es igual a esto:
//const envfb = () => {
//return {}
//}
