import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { api } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function getTotalSpent() {
  const response = await api.expenses['total-spent'].$get()
  if (!response.ok) {
    throw new Error('Failed to fetch total spent')
  }
  const data = await response.json()
  return data
}

function Index() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  if (isError) {
    return <div>Error Getting Data</div>
  }

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total money that you have spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? '...' : data.totalSpent}</CardContent>
    </Card>
  )
}
