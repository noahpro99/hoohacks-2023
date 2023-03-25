

from typing import List, Union
from pydantic import BaseModel


class BestBinRequest(BaseModel):
    image_base64: str
    bin_names: List[str]