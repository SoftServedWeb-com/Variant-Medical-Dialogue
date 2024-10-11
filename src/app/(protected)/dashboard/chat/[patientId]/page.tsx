import AIChat from "../components/ai-chat";

export default function ChatPage({ params }: { params: { patientId: string } }) {
    const { patientId } = params;

  return (
    <div className="container mx-auto w-full flex flex-col min-h-[100dvh] items-center justify-center pt-6">
      <h1 className="text-lg font-semibold mb-6">AI Assistant Chat</h1>
      <AIChat patientId={patientId} />
    </div>
  )
}
