import "./css/ErrorPage.css";
import "./css/ErrorPage.tablet.css";
import "./css/ErrorPage.phone.css";

export const ErrorPage = () => {
  return (
    <section className="error-page-section">
      <div className="error-page-containers">
        <div className="error-page-top-container">
          <h1 className="error-page-top-title">404</h1>
        </div>
        <div className="error-page-bottom-container">
          <h2 className="error-page-bottom-title">
            the page you were looking for doesn&apos;t exist
          </h2>
        </div>
      </div>
    </section>
  );
};
