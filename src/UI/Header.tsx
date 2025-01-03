import React, { memo } from "react";
import { MaterialSymbol } from "react-material-symbols";

const Header = memo(function Header() {
  return (
    <header className="app-header p-6 text-3xl text-purple-500 bg-gray-100 rounded-xl flex gap-2 items-center text-center">
      <MaterialSymbol icon="nutrition"/>
      <span>Matej's Fruit Machine</span>
      <MaterialSymbol icon="nutrition"/>
    </header>
  );
});

export default Header;