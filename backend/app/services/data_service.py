"""Data service for loading JSON files"""
import json
from pathlib import Path
from typing import Dict, Any


class DataService:
    """Service for loading data from JSON files"""

    def __init__(self):
        """Initialize data service with data directory path"""
        self.data_dir = Path(__file__).parent.parent / "data"

    def _load_json(self, filename: str) -> Dict[str, Any]:
        """
        Load and parse a JSON file

        Args:
            filename: Name of the JSON file to load

        Returns:
            Parsed JSON data as dictionary

        Raises:
            FileNotFoundError: If file doesn't exist
            json.JSONDecodeError: If file contains invalid JSON
        """
        file_path = self.data_dir / filename

        if not file_path.exists():
            raise FileNotFoundError(f"Data file not found: {filename}")

        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def load_profile(self, lang: str = "zh") -> Dict[str, Any]:
        """
        Load profile data in specified language

        Args:
            lang: Language code ('zh' or 'en')

        Returns:
            Profile data dictionary
        """
        return self._load_json(f"profile_{lang}.json")

    def load_research(self, lang: str = "zh") -> Dict[str, Any]:
        """
        Load research data in specified language

        Args:
            lang: Language code ('zh' or 'en')

        Returns:
            Research data dictionary
        """
        return self._load_json(f"research_{lang}.json")

    def load_news(self, lang: str = "zh") -> Dict[str, Any]:
        """
        Load news data in specified language

        Args:
            lang: Language code ('zh' or 'en')

        Returns:
            News data dictionary
        """
        return self._load_json(f"news_{lang}.json")

    def load_social_links(self) -> Dict[str, Any]:
        """
        Load social links data (no translation needed)

        Returns:
            Social links data dictionary
        """
        return self._load_json("social.json")

    def load_travels(self) -> Dict[str, Any]:
        return self._load_json("travels.json")

    def load_publications(self) -> Dict[str, Any]:
        return self._load_json("publications.json")
