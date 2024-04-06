// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
      <div>
          <h2>Our Mission</h2>
          <p>
            At <b>Byte System</b>, our mission is to help individuals in their job search journey. We believe that finding the right job should be accessible to everyone, regardless of background or experience.
          </p>

          <p>
            With XenCV, our flagship product, we aim to democratize the job application process. XenCV leverages AI technology to provide personalized job recommendations based on individual skills and experience, ultimately helping candidates find their ideal positions.
          </p>
          <p>
            Using AI, we are able to match candidates with the right job opportunities, leading to higher job satisfaction and better career outcomes. Our platform is designed to help job seekers find their right way and achieve their career goals.
          </p>
        </div>
        <img id="mission" src="img1.png" alt="team brainstorming" />
      </section>
    </main>
  );
}
