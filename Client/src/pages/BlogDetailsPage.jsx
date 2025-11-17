import { Fragment } from "react";
import Header from "../components/Layout/Header/Header";
import BlogDetail from "../components/BlogDetails/BlogDetail";
import Footer from "../components/Layout/Footer/Footer";

const BlogDetailsPage = () => {
  return (
    <Fragment>
      <Header />
      <BlogDetail />
      <Footer />
    </Fragment>
  );
};

export default BlogDetailsPage;