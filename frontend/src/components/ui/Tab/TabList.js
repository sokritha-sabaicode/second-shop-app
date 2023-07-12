import Tab from "./Tab";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TabList({ categories }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");

  // Update activeTab state when router.query changes
  useEffect(() => {
    if (router.query.category) {
      setActiveTab(router.query.category);
    }
  }, [router.query.category, activeTab]);

  const handleClick = (category) => {
    // Update state
    setActiveTab(category);

    // Update URL query parameter
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: category },
    });
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap items-center justify-start w-2/3 py-4 md:py-8">
        {categories.map((category) => (
          <Tab
            key={category._id}
            label={category.name}
            isFocus={activeTab === category.name}
            onClick={() => handleClick(category.name)}
          />
        ))}
      </div>
    </div>
  );
}
