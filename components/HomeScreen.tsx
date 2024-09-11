
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput  } from 'react-native';
import debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Book } from './Book';
import FastImage from 'react-native-fast-image';

const HomeScreen: React.FC = (): React.JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
          setBooks(data.items || []);
          setFilteredBooks(data.items || []);
        } 
       catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query) {
        const lowercasedQuery = query.toLowerCase();
        const filtered = books.filter(book => {
          const titleMatch = book.volumeInfo.title.toLowerCase().includes(lowercasedQuery);
          const authorMatch = book.volumeInfo.authors.join(', ').toLowerCase().includes(lowercasedQuery);
          const genreMatch = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ').toLowerCase().includes(lowercasedQuery) : false;
          return titleMatch || authorMatch || genreMatch;
        });
        setFilteredBooks(filtered);
      } else {
        setFilteredBooks(books);
      }
    }, 300), [books]
  );

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  
const BookItem: React.FC<{ item: Book; onPress: () => void }> = React.memo(({item , onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <FastImage
    source={{
      uri: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200?text=No+Image',

    }}
    style= {styles.thumbnail}
    resizeMode={FastImage.resizeMode.cover}
    />
     <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.volumeInfo.title || 'Unknown Title'}</Text>
        <Text style={styles.author}>by {item.volumeInfo.authors?.join(', ') || 'Unknown Author'}</Text>
        <Text style={styles.categories}>{item.volumeInfo.categories ? `Categories: ${item.volumeInfo.categories.join(', ')}` : 'Categories: N/A'}</Text>
        <Text style={styles.price}>{`List Price: ${item.saleInfo.listPrice?.amount || 'N/A'} ${item.saleInfo.listPrice?.currencyCode || ''}`}</Text>
        
        {/* <Text style={styles.price}>{`Retail Price: ${item.volumeInfo.saleInfo.retailPrice?.amount || 'N/A'} ${item.volumeInfo.saleInfo.retailPrice?.currencyCode || ''}`}</Text> */}
      </View>
  </TouchableOpacity>
));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredBooks.length === 0 ? (
        <Text style={styles.emptyMessage}>No books found</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookItem 
              item={item}
              onPress={() => navigation.navigate('BookDetails', { book: item })}
            />
          )}
          contentContainerStyle={styles.list}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFA07A',
  },
    searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 150,
    height: 230,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  categories: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  publishedDate: {
    fontSize:14,
    color: '#777',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
