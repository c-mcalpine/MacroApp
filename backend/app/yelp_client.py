import os
import requests
from dotenv import load_dotenv
from typing import List, Dict, Union

load_dotenv()

YELP_API_KEY = os.getenv('YELP_API_KEY')
YELP_API_URL = 'https://api.yelp.com/v3/businesses/search'
YELP_BUSINESS_URL = 'https://api.yelp.com/v3/businesses/'

HEADERS = {
    'Authorization': f'Bearer {YELP_API_KEY}',
}

def fetch_yelp_businesses(term: str, location: str, limit: int = 5) -> Union[List[Dict], Dict]:
    """
    Fetch raw business data from Yelp API.

    Args:
        term (str): Search term (e.g., 'pizza', 'sushi').
        location (str): Location to search (e.g., 'New York').
        limit (int): Number of businesses to fetch (default: 5).

    Returns:
        Union[List[Dict], Dict]: A list of businesses or an error dict.
    """
    params = {
        'term': term,
        'location': location,
        'limit': limit,
    }

    try:
        response = requests.get(YELP_API_URL, headers=HEADERS, params=params)
        response.raise_for_status()
    except requests.exceptions.HTTPError as http_err:
        return {'error': f'HTTP Error: {http_err}'}
    except requests.exceptions.RequestException as req_err:
        return {'error': f'Request Error: {req_err}'}

    return response.json().get('businesses', [])

def format_yelp_businesses(businesses: List[Dict]) -> List[Dict]:
    """
    Extract and format relevant business information.

    Args:
        businesses (List[Dict]): Raw list of businesses from Yelp API.

    Returns:
        List[Dict]: Formatted business details.
    """
    formatted_businesses = []

    for business in businesses:
        business_info = {
            'name': business.get('name'),
            'rating': business.get('rating', 'No rating available'),
            'review_count': business.get('review_count', 'No review count available'),
            'address': business.get('location', {}).get('address1', 'No address available'),
            'phone': business.get('display_phone', 'No phone available'),
            'url': business.get('url', 'No URL available'),
        }
        formatted_businesses.append(business_info)

    return formatted_businesses

def get_yelp_reviews(term: str, location: str, limit: int = 5) -> Union[List[Dict], Dict]:
    """
    Get formatted Yelp reviews for a specific search term and location.

    Args:
        term (str): Search term (e.g., 'pizza').
        location (str): Location to search (e.g., 'New York').
        limit (int): Number of businesses to fetch (default: 5).

    Returns:
        Union[List[Dict], Dict]: Formatted business reviews or an error dict.
    """
    businesses = fetch_yelp_businesses(term, location, limit)

    # If an error occurred during fetch
    if isinstance(businesses, dict) and 'error' in businesses:
        return businesses

    # Format the businesses for API response
    return format_yelp_businesses(businesses)
