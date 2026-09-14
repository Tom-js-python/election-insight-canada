from typing import Annotated, Literal
from pydantic import BaseModel, Field, StringConstraints

class CandidateResult(BaseModel):
    candidate_name: str
    party_key: str
    party_name: str
    vote_count: int
    vote_share: float
    outcome: Literal["win", "loss"]
    margin_votes: int
    margin_percentage_points: float

class RidingResult(BaseModel):
    district_number: int
    district_name: str
    results: list[CandidateResult]

class SwingRidingFilters(BaseModel):
    party_name: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
    outcome: Literal["win","loss","both"]
    margin: int = Field(ge=1)