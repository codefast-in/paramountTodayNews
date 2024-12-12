import SubCategorySingle from "@/pages/SubCategorySingle";
import React from "react";

const page = ({params}) => {
  const {id} = params;
  return <SubCategorySingle id={id} />;
};

export default page;
