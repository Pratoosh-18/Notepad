import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Home</h1>
      </div>

      <div className="container mx-auto">
        This is a notepad app.

        <input type="text" className="border-2 border-gray-300 rounded-md p-2" placeholder="Enter your note" />
        <button>Save</button>
      </div>

    </>
  );
}
