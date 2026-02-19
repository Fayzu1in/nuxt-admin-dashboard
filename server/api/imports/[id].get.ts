export default defineEventHandler(async (event) => {
  await new Promise(r => setTimeout(r, 600))

  const id = getRouterParam(event, "id")

  return {
    import: {
      id,
      delivery_no: "157",
      warehouse: "Warehouse",
      status: "Завершен",
    },

    items: [
      {
        ean: "EAN13 ABGD1715",
        invoice: "1051138/25/12/FV/0000097",
        store: "Магазин 1",
        arrival_date: "15.09.2025 17:04",
        status: "Принят не по списку",
      },
      {
        ean: "EAN13 ABGD1234",
        invoice: "1051138/25/12/FV/0000097",
        store: "Магазин 1",
        arrival_date: "15.09.2025 17:04",
        status: "Принят",
      },
      {
        ean: "EAN13 ABGD1243",
        invoice: "1051138/25/12/FV/0000097",
        store: "Магазин 1",
        arrival_date: "15.09.2025 17:04",
        status: "Принят",
      }
    ]
  }
})
