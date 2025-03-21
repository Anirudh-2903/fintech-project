import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import React from "react";


const font_Sans = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["300","400","500","600","700"],
});


export const metadata: Metadata = {
    title: "Fintech Project",
    description: "A full stack dashboard",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn('min-h-screen font-sans bg-dark-300 antialiased',font_Sans.variable)}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}