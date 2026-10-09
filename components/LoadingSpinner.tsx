export default function LoadingSpinner() {
  return (
    <div className="text-center text-slate-400 py-12">
      <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p>Menganalisis...</p>
    </div>
  );
}
