import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import "./App.css";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total money that you have spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
      <Button onClick={() => setTotalSpent(totalSpent + 1)}>Add 1</Button>
    </Card>
  );
}

export default App;
