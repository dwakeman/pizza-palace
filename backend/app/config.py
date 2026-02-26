from pydantic_settings import BaseSettings
from typing import List


from typing import Optional


class Settings(BaseSettings):
    database_url: Optional[str] = None
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_origins: str = "http://localhost:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

# Made with Bob
