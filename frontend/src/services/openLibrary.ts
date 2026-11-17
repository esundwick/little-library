/**
 * OpenLibrary API Service
 * Fetches book details based on ISBN.
 */

export interface BookDetail {
  title: string;
  author: string;
  publishDate: string;
  coverUrl: string;
  description: string;
}

export const fetchBookByISBN = async (isbn: string): Promise<BookDetail | null> => {
  try {
    // OpenLibrary Search API endpoint
    const response = await fetch(`https://openlibrary.org/search.json?biblio=ISBN&search=${isbn}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from OpenLibrary');
    }

    const data = await response.json();

    if (data.numFound === 0) {
      return null;
    }

    const book = data.docs[0];
    
    // Basic data extraction
    return {
      title: book.title || 'Unknown Title',
      author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
      publishDate: book.publish_date || 'N/A',
      coverUrl: book.cover_art ? `https://covers.openlibrary.org/snapshots/${book.edition_key}.jpg` : '',
      description: book.description || 'No description available.',
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
};
