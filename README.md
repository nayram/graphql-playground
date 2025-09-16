# GraphQL Playground

A Node.js GraphQL playground built with Express and Apollo Server, featuring a Book management system with queries and mutations.

## 📋 Features

- **GraphQL API** with Apollo Server
- **Express.js** web server
- **Book Management System** with:
  - Book type with id, title, author, and publishedDate fields
  - Query to fetch all books or a specific book by ID
  - Mutation to add new books (in-memory storage)
- **Sample Data** loaded from JSON file
- **Modern ES6+ syntax** with ES modules
- **GraphQL Playground** for interactive testing

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nayram/graphql-playground.git
   cd graphql-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   - **Server Info**: http://localhost:4000/
   - **GraphQL Playground**: http://localhost:4000/graphql

## 📊 API Schema

### Types

```graphql
type Book {
  id: ID!
  title: String!
  author: String!
  publishedDate: String!
}
```

### Queries

```graphql
# Get all books
books: [Book!]!

# Get a specific book by ID
book(id: ID!): Book
```

### Mutations

```graphql
# Add a new book (stored in memory)
addBook(title: String!, author: String!, publishedDate: String!): Book!
```

## 💡 Example Queries

### Get All Books
```graphql
query GetAllBooks {
  books {
    id
    title
    author
    publishedDate
  }
}
```

### Get Specific Book
```graphql
query GetBook {
  book(id: "1") {
    id
    title
    author
    publishedDate
  }
}
```

### Add New Book
```graphql
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
```

## 📁 Project Structure

```
graphql-playground/
├── server.js          # Main server file with GraphQL setup
├── books.json         # Sample book data
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## 🛠️ Development

- **Start server**: `npm start` or `npm run dev`
- The server includes hot-reloading capabilities
- GraphQL Playground is automatically available at `/graphql`

## 📚 Sample Data

The application comes with 5 sample books:
- To Kill a Mockingbird by Harper Lee
- 1984 by George Orwell
- Pride and Prejudice by Jane Austen
- The Great Gatsby by F. Scott Fitzgerald
- Harry Potter and the Philosopher's Stone by J.K. Rowling

## 🔧 Technical Details

- **Node.js** with ES modules (`"type": "module"`)
- **Apollo Server v4** for GraphQL implementation
- **Express.js** for HTTP server
- **In-memory storage** for new books added via mutations
- **JSON file** for initial book data
- **Modern async/await** syntax throughout

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is licensed under the ISC License.
