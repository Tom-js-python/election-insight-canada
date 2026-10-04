import type { ApiPoliticalParty } from '@/types/api/parties'
import type { PoliticalParty } from '@/types/parties'

export const mapPoliticalParty = (party: ApiPoliticalParty): PoliticalParty => ({
  partyKey: party.party_key,
  sourceNameEnglish: party.source_name_english,
  sourceNameFrench: party.source_name_french,
  longDisplayNameEnglish: party.long_display_name_english,
  longDisplayNameFrench: party.long_display_name_french,
  shortDisplayNameEnglish: party.short_display_name_english,
  shortDisplayNameFrench: party.short_display_name_french,
})
