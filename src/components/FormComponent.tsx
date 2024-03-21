import { Button, Form } from "react-bootstrap";
import { TProduct } from "../types/product";
import { useEffect, useState } from "react";
import Joi from "joi";


type Props = {
    onSubmit: (product: TProduct) => void
}
const categories = ['Mouse', 'Keyboard', 'Monitor']
const FormComponent = ({ onSubmit }: Props) => {
    const [product, setProduct] = useState<TProduct>( {
          name: "",
          price: 0,
          category: "",
          image: "",
        }
      );

      const [errors, setErrors] = useState<{[key: string]: string}>({});

      useEffect(() => {
          validateForm();
      }, [product]);
      const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateForm()) {
          onSubmit(product);
        }
      }
      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setProduct((prevs) => ({ ...prevs, [name]: value }));
      };


      const validateForm = (): boolean => {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Product name is required'
            }),
            price: Joi.number().required().messages({
                'any.required': 'Price is required',
                'number.base': 'Price must be a number'
            }),
            category: Joi.string().required().messages({
                'any.required': 'Category is required'
            }),
            image: Joi.string().required().messages({
                'any.required': 'Image is required'
            }),
        });

        const { error } = schema.validate(product, { abortEarly: false });
        if (error) {
            const newErrors: {[key: string]: string} = {};
            error.details.forEach(detail => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return false;
        } else {
            setErrors({});
            return true;
        }
    };

  return (
 
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            <Form.Group controlId="">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter product price"
                value={product.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>}
            <Form.Group controlId="">
              <Form.Label>Product Category</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                >{categories.map((category) => <option key={category}>{category}</option>)}</Form.Select>
            </Form.Group>
            {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
            <Form.Group controlId="">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter product Image"
                value={product.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            {errors.image && <Form.Text className="text-danger">{errors.image}</Form.Text>}
            <Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Create
              </Button>
            </Form.Group>
          </Form>
        </div>
      );
}

export default FormComponent