const NoDataComponent = () =>
  setTimeout(() => {
    <div style={{ textAlign: "center", margin: "50px 0" }}>
      <h2>No products found</h2>
      <p>
        We couldn’t find any products in this category. Please explore other
        categories!
      </p>
    </div>;
  }, 3000);
export default NoDataComponent;
