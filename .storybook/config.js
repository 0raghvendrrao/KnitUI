import { addParameters, configure, addDecorator } from "@storybook/react"
import { withInfo } from "@storybook/addon-info"
import { addReadme } from "storybook-readme"
import React from "react"
import theme from "./theme"
import { GlobalStyles, ThemeProvider } from "../components/styles"

// automatically import all files ending in *.stories.tsx
const req = require.context("../components", true, /.stories.tsx$/)

const ThemeProviderDecorator = storyFn => (
  <ThemeProvider>{storyFn()}</ThemeProvider>
)

const GlobalStylesDecorator = storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
)

addParameters({
  options: {
    name: "KnitUI",
    theme,
  },
})

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(ThemeProviderDecorator)
addDecorator(GlobalStylesDecorator)
addDecorator(addReadme)

configure(loadStories, module)
