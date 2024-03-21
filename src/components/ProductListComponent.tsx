import { useEffect } from "react";
import { Table } from "react-bootstrap"
import { TProduct } from "../types/product";
const api = "http://localhost:3001/products";
import { useProducts } from "../context/context";
import FormComponent from "./FormComponent";

const ProductListComponent = () => {

    const { products, setProducts } = useProducts();
  
    const addProduct = async (product: TProduct) => {
      try {
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
    
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        setProducts([...products, product]);
      } catch (error) {
        console.error('Error adding product:', error)
      }
    };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2> Product Form</h2>
          </div>
        <FormComponent onSubmit={addProduct}/>
          <div className="col-12">
            <h2>Product List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Category</td>
            
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td><img width="100px" src={product.image} alt={product.name} /></td>
                      <td>{product.category || "Đang cập nhật"}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListComponent