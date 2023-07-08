import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-6">
        <div className="">
          <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
            Welcome Onboard!
          </h2>
        </div>
      </main>
    </>
  );
}
