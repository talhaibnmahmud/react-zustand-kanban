import { Column } from "@/components/column";

function App() {
  return (
    <main className="min-h-svh max-w-7xl mx-auto my-4 px-4 grid grid-cols-3 gap-6 items-start">
      <Column state="PLANNED" />
      <Column state="PENDING" />
      <Column state="COMPLETED" />
    </main>
  );
}

export default App;
