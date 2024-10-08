import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";

import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: "50" },
  { id: 2, title: "Utilities", amount: "100" },
  { id: 3, title: "Rent", amount: "1000" },
];

export const expenseRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json({ expenses: expenses });
  })

  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const user = c.var.user;
    const expense = await c.req.valid("json");

    const result = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    return c.json({
      message: "Expense created",
      result,
    });
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    //   const {id} = c.req.param()  //another way to get id from request url

    //for the sake of use here - we need always integer id
    // in url use regex to ensure that id entered is integer (anytihng else will return 404)

    const id = Number.parseInt(c.req.param("id")); //get id from request url and convert it to number

    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })

  .get("/total-spent", getUser, (c) => {
    const totalSpent = fakeExpenses.reduce(
      (total, expense) => total + +expense.amount,
      0
    );
    return c.json({ totalSpent });
  })

  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return c.notFound();
    }

    fakeExpenses.splice(index, 1);

    return c.json({ fakeExpenses });
  });
