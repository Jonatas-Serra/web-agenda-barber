import React, { useEffect, useState } from 'react'

import CardProduct from './CardProduct'

import api from '../services/api'
import PaginationProducts from './PaginationProducts'

interface Products {
  barber: string
  _id: string
  name: string
  description: string
  price: number
  image: string

  handlemodalIsOpenDelete: (id: string) => void
  handleSelectProduct: (product: Products) => void
}

export function Products() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Products[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products,
  )
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false)
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false)
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(2)
  const [width, setWidth] = useState(window.innerWidth)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const token = localStorage.getItem('@AgendaBarber:token')

  // Get products
  const getProducts = async () => {
    const response = await api.get('products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setProducts(response.data)
  }

  // Delete product
  const handleDeleteProduct = async (_id: string) => {
    await api.delete(`/products/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setModalIsOpenDelete(false)
    setLoading(true)
    getProducts()
  }

  // Modify the number of products per page according to the screen size
  const handleResize = () => {
    if (width > 640) {
      setProductsPerPage(4)
    } else {
      setProductsPerPage(8)
    }
  }

  // Open the modal to delete a product
  const handlemodalIsOpenDelete = (_id: string) => {
    setModalIsOpenDelete(true)
    setSelectedProduct(products.find((product) => product._id === _id)!)
  }

  // Select a product
  const handleSelectProduct = (product: Products) => {
    setSelectedProduct(product)
    setModalIsOpenEdit(true)
  }
  // Determine the index of the last product
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  // Inicialize the products
  useEffect(() => {
    getProducts()
    setLoading(false)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, width])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-end">
        <button className="justify-center font-bold text-xl px-5 py-3 my-3 mr-3 text-white-100 bg-orange-500 rounded-lg shadow-md hover:bg-orange-400">
          Adicionar
        </button>
      </div>
      <div className="flex flex-wrap w-full mt-8 justify-center">
        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-16 h-16 animate-spin text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          currentProducts.map((product: Products) => (
            <CardProduct
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              handlemodalIsOpenDelete={handlemodalIsOpenDelete}
              handleSelectProduct={handleSelectProduct}
              _id={product._id}
            />
          ))
        )}
      </div>
      <PaginationProducts
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        setCurrentPage={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}
