import { useParams } from "react-router-dom";
import { CHECK_TESTS } from "../data/checkTestsData";
import styles from "./HealthCheackPage.module.css";

export default function CheckTests() {
  const { category } = useParams();

  const data = CHECK_TESTS[category as keyof typeof CHECK_TESTS];

  if (!data) {
    return <h2>Category not found</h2>;
  }

  return (
    <div className={styles.page}>
      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        Home &gt; Lab Tests &gt; <b>{data.title}</b>
      </div>

      <div className={styles.layout}>
        {/* LEFT FILTERS */}
        <aside className={styles.filters}>
          <h3>Filters</h3>
          <label><input type="checkbox" /> Home Sample</label>
          <label><input type="checkbox" /> NABL</label>
          <label><input type="checkbox" /> 24hr Report</label>
        </aside>

        {/* RIGHT CONTENT */}
        <main className={styles.content}>
          <div className={styles.header}>
            <h2>{data.title} ({data.tests.length})</h2>
            <select>
              <option>Sort By</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>

          <div className={styles.grid}>
            {data.tests.map((test) => (
              <div key={test.id} className={styles.card}>
                <h4>{test.name}</h4>
                <p>{test.tests} Tests Included</p>
                <div className={styles.price}>
                  ₹{test.price} <span>₹{test.old}</span>
                </div>
                <button>Add</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}