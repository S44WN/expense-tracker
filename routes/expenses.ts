import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Expense = {
  id: string;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: "1", title: "Groceries", amount: 50 },
  { id: "2", title: "Utilities", amount: 100 },
  { id: "3", title: "Rent", amount: 1000 },
];

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })

  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    // const expense = createPostSchema.parse(data);

    // console.log(expense.amount);
    // console.log(expense);

    fakeExpenses.push({
      id: (fakeExpenses.length + 1).toString(),
      title: expense.title,
      amount: expense.amount,
    });

    return c.json({
      message: "Expense created",
      expense,
    });
  });
