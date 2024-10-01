import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const response = await api.expenses.$get()
  if (!response.ok) {
    throw new Error('Failed to fetch expenses')
  }
  const data = await response.json()
  return data
}

function Expenses() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  })

  if (isError) {
    return <div>Error Getting Data</div>
  }

  return (
    <Table className="p-2 max-w-3xl m-auto">
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell className="font-medium">{expense.title}</TableCell>
                <TableCell className="font-medium">{expense.amount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
