# How to use?

Add your achievements to `./list.txt`. Format:
```
name -- quote -- description
```

run

```
npm install
node .
```

After script finishes, your generated achievements will be in `./achievements` folder.

# How to create personal layout?

Modify file [templates/index.html](/templates/index.html) to create your own layout for achievements. You can add styles in [public/index.css](/public/index.css).

There is a simple template mechanism [here](/lib/page-generator.js#L39), so you can add your rules [here](lib/page-generator.js#L12) for better customization.

## Enjoy!
