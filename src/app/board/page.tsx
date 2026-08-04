import BoardSection from "@/components/sections/BoardSection";

export async function generateMetadata() {
  return {
    title: "Meet the Team - AI at UCI",
    description: "Learn more about the amazing people behind our organization",
  };
}

export default function Board() {
  return <BoardSection />;
}
