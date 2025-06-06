"use client";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { networkConfig } from "../lib/networkConfig";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "@repo/ui/components/sonner";
import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();
const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider>{children}</WalletProvider>
        </SuiClientProvider>
        <Toaster />
      </AppThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
