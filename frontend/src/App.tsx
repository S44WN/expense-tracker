import { useState } from "react";
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
