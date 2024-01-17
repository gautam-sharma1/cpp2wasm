import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ResizablePanel";

export function ResizableEditors({ Editor1, Editor2 }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full r justify-center p-6">
          <span className="font-semibold">{Editor1}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full  justify-center p-6">
          <span className="font-semibold">{Editor2}</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default ResizableEditors;
