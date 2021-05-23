import styles from "./Paginator.module.css";

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize) - 990;
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.usersPageList}>
      {pages.map((p) => {
        return (
          <span
            className={currentPage === p ? styles.selectedPage : styles.page}
            onClick={(e) => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
