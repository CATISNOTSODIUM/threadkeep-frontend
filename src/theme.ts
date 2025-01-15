import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const overrides = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: '"Roboto", "Noto", sans-serif"'
            },
            h1: {
                fontFamily: '"Roboto", "Noto", sans-serif"'
            }
        }),
    },
})

const AppTheme = extendTheme(overrides)

export default AppTheme;