import React from "react";

const OnCartContext = React.createContext({
    products: [],
    setProducts: () => {}
});

export default OnCartContext;