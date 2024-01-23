import { Column } from "@/components/column";

function App() {
  return (
    <div className="py-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <main className="min-h-svh max-w-7xl mx-auto px-4 grid grid-cols-3 gap-6 items-start">
        <Column status="PLANNED" />
        <Column status="ONGOING" />
        <Column status="DONE" />
      </main>
    </div>
  );
}

export default App;
