function Product(props) {
  console.log(props);

  return (
    <div className="grid shadow-2xl  h-full font-serif gap-3 bg-linear-to-l from-red-600 via-blue-500 to-green-700 rounded-4xl pl-6 pt-3">
      <h1 className="text-3xl">{props.product.title}</h1>
      <p>
        <h1 className="font-bold inline">Category:</h1> {props.product.category}
      </p>
      <p>
        <h1 className="font-bold inline">Price:</h1> ${props.product.price}
      </p>
      <p>
        <h1 className="font-bold inline">Rating:</h1>{" "}
        {props.product.rating.rate} ({props.product.rating.count} reviews)
      </p>
      <p>{props.product.description}</p>
    </div>
  );
}
export default Product;
