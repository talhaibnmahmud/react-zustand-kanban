import { Column } from "@/components/column";

function App() {
  return (
    <main className="min-h-svh max-w-7xl mx-auto my-4 px-4 grid grid-cols-3 gap-6 items-start">
      <Column status="PLANNED" />
      <Column status="ONGOING" />
      <Column status="DONE" />
    </main>
  );
}

export default App;
