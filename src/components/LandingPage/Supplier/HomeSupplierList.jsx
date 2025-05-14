import React from "react";
import { suppliers } from "../../../assets/data/suppliers";
import HomeSupplierCard from "./HomeSupllierCard";

const HomeSupplierList = () => {
  return (
    <div className="container mx-auto px-5 lg:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {suppliers.map((supplier) => (
          <HomeSupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};

export default HomeSupplierList;
