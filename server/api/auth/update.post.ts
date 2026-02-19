import { user } from "../../mock/user"

export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 800))

  const body = await readBody(event)


  if (!body.name) {
    setResponseStatus(event, 400)
    return { message: "Имя обязательно" }
  }

  // mock ответ
  Object.assign(user, body)
  return { user }

})
