import { createContext, useContext, useState, useEffect } from "react";
import { TProduct } from "../types/product";
const api = "http://localhost:3001/products";
type ProductConText = {
    products: TProduct[]
    setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
}

const ProductContext = createContext<ProductConText | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
    const [products, setProducts] = useState<TProduct[]>([]);
    const fetchProducts = async () => {
      try {
        const response = await fetch(api);
        const data: TProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);
    return (
      <ProductContext.Provider value={{ products, setProducts }}>
        {children}
      </ProductContext.Provider>
    );
  };

  export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
  };