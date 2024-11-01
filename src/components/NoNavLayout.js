// src/components/NoNavLayout.js
import React from 'react';

export default function NoNavLayout({ children }) {
  return (
    <div className="no-nav-layout">
      {children}
    </div>
  );
}
