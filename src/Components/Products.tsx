import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Products: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    qty: 0,
    rate: 0,
    total: 0,
    gst: 0
  });

  const userId = useSelector((state: any) => state.user.id);

  const [products, setProducts] = useState<any[]>([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const total = product.qty * product.rate;
    const gst = total * 0.18; // 18% GST
    setProduct({ ...product, total, gst });
  }, [product.qty, product.rate]);

  useEffect(() => {
    let total = 0;
    products.forEach((prod) => {
      total += prod.total + prod.gst;
    });
    setGrandTotal(total);
  }, [products]);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handleProductQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, qty: Number(e.target.value) });
  };

  const handleProductRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, rate: Number(e.target.value) });
  };

  const handleAddProduct = () => {
    setProducts([...products, product]);
    setProduct({ name: '', qty: 0, rate: 0, total: 0, gst: 0 });
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleNext = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/product/pdf', {
        products,
        grandTotal,
        userId
      }, {
        responseType: 'arraybuffer', // Set the response type to 'arraybuffer' to receive binary data
      });

      // Create a blob from the response data
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Open the URL in a new tab/window or download the PDF
      window.open(pdfUrl);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Product Name:</label>
        <input id="name" type="text" className="border border-gray-400 rounded-md p-2 focus:outline-none focus:border-blue-500" value={product.name} onChange={handleProductNameChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="qnt" className="block text-gray-700">Product Quantity:</label>
        <input id="qnt" type="number" className="border border-gray-400 rounded-md p-2 focus:outline-none focus:border-blue-500" value={product.qty} onChange={handleProductQtyChange} />
      </div>
      <div className="mb-4">
        <label htmlFor="rate" className="block text-gray-700">Product Rate:</label>
        <input id="rate" type="number" className="border border-gray-400 rounded-md p-2 focus:outline-none focus:border-blue-500" value={product.rate} onChange={handleProductRateChange} />
      </div>
      <div>
        <p className="text-gray-700">Product Total: {product.total}</p>
        <p className="text-gray-700">Product GST: {product.gst}</p>
      </div>
      <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 mr-2">Add Product</button>
      <hr className="my-4" />
      <h3 className="text-lg font-bold">Added Products:</h3>
      <ul className="list-disc ml-8">
        {products.map((prod, index) => (
          <li key={index} className="mb-2">
            {prod.name} - Qty: {prod.qty}, Rate: {prod.rate}, Total: {prod.total}, GST: {prod.gst}
            <button onClick={() => handleDeleteProduct(index)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-4">Delete</button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-700">Grand Total: {grandTotal}</p>
      <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Next</button>
    </div>
  );
};

export default Products;
