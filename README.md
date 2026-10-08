# BookTown (React)

React + Vite conversion of the original HTML/Bootstrap/vanilla-JS BookTown site.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

Routes: `/` home · `/books` newest · `/books/self-dev` · `/books/philosophy` · `/books/novels` · `/books/best` · `/cart` · `/profile` · `/payment`

Cart state lives in `src/context/CartContext.jsx` (Context + useReducer, persisted to localStorage).
Book data is in `src/data/books.js` (plain objects; stars are rendered by `<Stars />`).
