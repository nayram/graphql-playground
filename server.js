import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load books data from JSON file
let booksData = JSON.parse(readFileSync(join(__dirname, 'books.json'), 'utf8'));

// In-memory storage for new books (for the addBook mutation)
let inMemoryBooks = [];
let nextId = 6; // Starting ID for new books

// GraphQL type definitions
const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedDate: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, publishedDate: String!): Book!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    books: () => {
      // Return both original books from JSON and in-memory books
      return [...booksData, ...inMemoryBooks];
    },
    book: (_, { id }) => {
      // Search in both original data and in-memory books
      return [...booksData, ...inMemoryBooks].find(book => book.id === id);
    },
  },
  Mutation: {
    addBook: (_, { title, author, publishedDate }) => {
      const newBook = {
        id: nextId.toString(),
        title,
        author,
        publishedDate,
      };
      
      inMemoryBooks.push(newBook);
      nextId++;
      
      return newBook;
    },
  },
};

// Start server
const startServer = async () => {
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the GraphQL server with standalone server
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });
  
  console.log(`🚀 Server ready at ${url}`);
  console.log(`📊 GraphQL Playground available at ${url}`);
  console.log(`\n📖 Sample Queries:`);
  console.log(`
query GetAllBooks {
  books {
    id
    title
    author
    publishedDate
  }
}

query GetBook {
  book(id: "1") {
    id
    title
    author
    publishedDate
  }
}

mutation AddBook {
  addBook(
    title: "The Catcher in the Rye"
    author: "J.D. Salinger"
    publishedDate: "1951-07-16"
  ) {
    id
    title
    author
    publishedDate
  }
}
  `);
};

// Handle server startup errors
startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});