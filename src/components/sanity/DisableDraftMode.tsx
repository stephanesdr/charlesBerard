export function DisableDraftMode() {
  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[9999] border border-ink bg-surface px-3 py-2 font-label text-ink no-underline shadow-sm"
    >
      Quitter la preview
    </a>
  );
}
