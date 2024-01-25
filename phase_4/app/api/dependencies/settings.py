from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    efi_client_id: str = ""
    efi_client_secret: str = ""
