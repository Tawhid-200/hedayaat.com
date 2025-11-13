"use client";
import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Provider({
  children,
  defaultTheme = "dark",
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
