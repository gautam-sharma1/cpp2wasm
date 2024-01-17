import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
export default function Terminal({ input }) {
  console.log(input);
  return (
    <div className="mt-10">
      <div className="font-semibold mb-5">Build Output</div>
      {input.status === "warning" ? (
        <div data-prefix=">" className="text-warning text-wrap w-96 ">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            {" "}
            {input.text}
          </ScrollArea>
          ;
        </div>
      ) : input.status === "error" ? (
        <div data-prefix=">" className="text-error text-wrap">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            {" "}
            {input.text}
          </ScrollArea>
        </div>
      ) : (
        <div data-prefix=">" className="text-success text-wrap w-96">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            {" "}
            {input.text}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
