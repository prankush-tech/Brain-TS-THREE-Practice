import CanvasMain from "@/components/CanvasMain";
import dynamic from "next/dynamic";

const Scene = dynamic(()=> import('@/components/CanvasMain'),{
  ssr:false
})

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Scene/>
    </main>
  );
}
