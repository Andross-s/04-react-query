import styles from "./SearchBar.module.css";
// import { Toaster, toast } from "react-hot-toast";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleFormSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      {/* <Toaster /> */}
    </header>
  );
}

export default SearchBar;
