import { user } from "../../mock/user"

export default defineEventHandler(async (event) => {
  // имитация задержки
  await new Promise((resolve) => setTimeout(resolve, 800))

  const body = await readBody(event)
  const clearPhone = body.phone?.replace(/\D/g, "")

  if (clearPhone === "998999999999" && body.password === "1234") {
    return{
      token: "fake-token",
      user
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Неверный логин или пароль",
  })
})
