from typing import Annotated, Literal
from pydantic import BaseModel, Field, StringConstraints, ConfigDict, model_validator

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
    model_config = ConfigDict(extra="forbid")

    party_key: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
    outcome: Literal["win","loss","both"]
    max_margin_votes: int | None = Field(default=None, ge=1)
    max_margin_percentage_points: float | None = Field(default=None, gt=0)

    @model_validator(mode="after")
    def require_exactly_one_margin(self):
        supplied_margins = (
            self.max_margin_votes is not None,
            self.max_margin_percentage_points is not None
        )

        if sum(supplied_margins) !=1:
            raise ValueError(
                "Provide exactly one of max_margin_votes "
                "or max_margin_percentage_points"
            )

        return self