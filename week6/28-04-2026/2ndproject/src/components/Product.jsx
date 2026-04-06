function Product(props) {
  //{productObj :{}}
  const { productObj } = props;
  //state
  //return a react element
  return (
    <div className="shadow-2xl p-5">
        <h2 className="text-2xl text-blue-400">{productObj.title}</h2>
        <img src={productObj.image} alt="" />
        <p className="font-bold">{productObj.price}</p>
        <p className="font-mono">{productObj.description}</p>
    </div>
  )
}

export default Product;