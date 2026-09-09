from pydantic import BaseModel

class PoliticalPartyResult(BaseModel):
    party_key: str
    source_name_english: str
    source_name_french: str
    long_display_name_english: str
    long_display_name_french: str
    short_display_name_english: str
    short_display_name_french: str