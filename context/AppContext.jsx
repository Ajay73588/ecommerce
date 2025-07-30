'use client'
import { products as realProducts } from "@/assets/productData";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    // Use real product data
    const [products, setProducts] = useState(realProducts);
    const [userData, setUserData] = useState(false);
    const [isSeller, setIsSeller] = useState(true);
    const [cartItems, setCartItems] = useState({});

    // Dummy user fetch (can be improved later)
    const fetchUserData = async () => {
        setUserData(null);
    };

    // Add to cart by product id
    const addToCart = async (itemId) => {
        let cartData = { ...cartItems };
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    };

    // Update cart quantity
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    };

    // Get total cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId];
            }
        }
        return totalCount;
    };

    // Get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product.id === Number(itemId));
            if (itemInfo && cartItems[itemId] > 0) {
                // Remove $ and commas from price string, then convert to number
                const price = Number(itemInfo.price.replace(/[^\d.]/g, ""));
                totalAmount += price * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        // If you want to fetch products from an API later, update here
        setProducts(realProducts);
    }, []);

    useEffect(() => {
        fetchUserData();
    }, []);

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}