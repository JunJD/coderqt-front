/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
interface ITheme {
    [key: string]: any;
}
export const ThemeContext = createContext<ITheme>({});

export const ThemeProvider = ({ children, defaulttheme }: any) => {
    const [theme, setTheme] = useState();

    useEffect(() => {
        if (
            defaulttheme?.breakpoints &&
            Object.keys(defaulttheme.breakpoints).length > 0
        ) {
            defaulttheme.breakpoints.down = (key: string) => {
                let result = '';
                Object.keys(defaulttheme.breakpoints).forEach(
                    (breakpoint, index) => {
                        if (breakpoint === key) {
                            result = `(min-width: ${defaulttheme.breakpoints[key]}px)`;
                        }
                    },
                );
                return result;
            };
            defaulttheme.breakpoints.up = (key: string) => {
                let result = '';
                Object.keys(defaulttheme.breakpoints).forEach(
                    (breakpoint, index) => {
                        if (breakpoint === key) {
                            result = `(max-width: ${defaulttheme.breakpoints[key]}px)`;
                        }
                    },
                );
                return result;
            };
        }
        setTheme(defaulttheme);
    }, [defaulttheme]);

    const updateTheme = (addtheme: any) => {
        setTheme((currtheme: any) => {
            return { ...currtheme, ...addtheme };
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const { theme, updateTheme } = useContext(ThemeContext); // get the theme and toggleTheme function from the context
    return { theme, updateTheme };
};
