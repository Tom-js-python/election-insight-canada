export function partyColour(partyName: string): string {
  const colours: Record<string, string> = {
    Liberal: 'bg-red-600',
    Conservative: 'bg-blue-700',
    'Bloc Québécois': 'bg-sky-500',
    'NDP-New Democratic Party': 'bg-orange-500',
    'Green Party': 'bg-green-600',
  }

  return colours[partyName] ?? 'bg-slate-400'
}
