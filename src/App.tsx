import { useState } from "react";

import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-svh grid place-content-center">
      <h1 className="text-5xl font-semibold">Hello World!</h1>

      <section className="my-4 py-2 border border-zinc-300 rounded-lg flex flex-col items-center gap-2">
        <p className="font-mono">{count}</p>
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
      </section>
    </main>
  );
}

export default App;
