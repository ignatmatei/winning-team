import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Struggling to find a job or position?
          <br />
          Make it easier today with XenCV.
        </h1>
        <h2>
          An AI-powered RAG (Retrieval-Augmented Generation) model that analyzes your CV
          and provides possible positions to apply for based on your skills and
          experience.
        </h2>
        <Link to="/login" className="cta">
          Try it now
        </Link>
      </section>
    </main>
  );
}
