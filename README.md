# Setting Up

Just a heads up that this project requires Node because it is used to compile the templating engine. Assets aren't manipulated by it in any way.

- `cd` into the project folder
- run `npm install`
- run `npm run dev` to view the site

# Testing the Theme Engine

There are two key files to modify the theme:
- `app/css/variables-default.css` defines the systems default/fallback variables
  - these will reflect Canada.ca in the final design system
- `app/css/variables-theme.css` defines theme overrides
  - this is where third parties will create their own themes using ONLY the variables they need from the master list

In order to see this in action, you'll see in `variables-default.css` that we've defined a variable called `--default-brand-color-1`.
Objects on the site that are told to use this variable appear purple.

Let's say we're a third party, and want to define our main theme color as orange.

Inside `variables-theme.css`, uncomment the `--theme-brand-color-1` and save.

Notice how the elements that were once purple, are now orange. This is because we have overriden our default variable with a new theme variable.

CSS for each component (i.e. blockquotes, buttons, and accordions) is defined in their respective component CSS, but draws values from the theme file FIRST, and if that value is undefined in the theme file, it falls back to our default value, specified in the defaults file.

e.g. in `markup/components/button/button.css`:
```
.gc-button {
    border: 1px solid var(--theme-brand-color-1, var(--default-brand-color-1));
}
```