from pydantic import BaseModel

class CandidateResult(BaseModel):
    candidate_name: str
    party_name: str
    vote_count: int

class RidingResult(BaseModel):
    district_number: int
    district_name: str
    results: list[CandidateResult]